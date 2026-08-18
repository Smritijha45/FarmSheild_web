'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, UserRoleMode } from '../components/ui/Navbar';
import { FarmerHome } from '../components/farmer/FarmerHome';
import { AnimalList, AnimalItem } from '../components/farmer/AnimalList';
import { TreatmentModal } from '../components/farmer/TreatmentModal';
import { MilkSafetyCheck } from '../components/farmer/MilkSafetyCheck';
import { WarningsList } from '../components/farmer/WarningsList';
import { QRScannerModal } from '../components/farmer/QRScannerModal';
import { VetDashboard } from '../components/vet/VetDashboard';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { useLanguage } from '../providers/LanguageProvider';

export default function Home() {
  const { t } = useLanguage();
  const [roleMode, setRoleMode] = useState<UserRoleMode>('farmer');
  const [farmerView, setFarmerView] = useState<'home' | 'animals' | 'treatment' | 'milk_safety' | 'alerts' | 'history' | 'qr_scan'>('home');
  const [selectedQrToken, setSelectedQrToken] = useState<string>('');

  // Initial Animals State
  const [animals, setAnimals] = useState<AnimalItem[]>([
    {
      id: 'a101',
      animal_code: 'COW-101',
      species: 'cow',
      breed: 'Gir',
      dob: '2022-03-15',
      sex: 'female',
      weight: 380,
      purpose: 'milk',
      health_status: 'healthy',
      qr_token: 'QR-COW-101',
    },
    {
      id: 'a102',
      animal_code: 'COW-102',
      species: 'cow',
      breed: 'HF Cross',
      dob: '2021-08-10',
      sex: 'female',
      weight: 430,
      purpose: 'milk',
      health_status: 'under_treatment',
      qr_token: 'QR-COW-102',
    },
    {
      id: 'a103',
      animal_code: 'BUF-201',
      species: 'buffalo',
      breed: 'Murrah',
      dob: '2020-05-20',
      sex: 'female',
      weight: 510,
      purpose: 'milk',
      health_status: 'healthy',
      qr_token: 'QR-BUF-201',
    },
  ]);

  const fetchAnimals = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/animals');
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
        setAnimals(json.data);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleAddAnimal = (newAnimalData: Omit<AnimalItem, 'id' | 'qr_token' | 'health_status'>) => {
    const qrToken = `QR-${newAnimalData.animal_code.toUpperCase().replace(/\s+/g, '-')}`;
    const newAnimal: AnimalItem = {
      ...newAnimalData,
      id: `a_${Date.now()}`,
      qr_token: qrToken,
      health_status: 'healthy',
    };

    setAnimals((prev) => [newAnimal, ...prev]);

    fetch('http://localhost:5000/api/animals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnimalData),
    }).catch(() => {});
  };

  const handleSelectAnimalForQr = (token: string) => {
    setSelectedQrToken(token);
    setFarmerView('qr_scan');
  };

  // Live Stats calculation
  const totalAnimals = animals.length;
  const underTreatment = animals.filter((a) => a.health_status === 'under_treatment' || a.health_status === 'sick').length;
  const underWithdrawal = animals.filter((a) => a.health_status === 'under_treatment').length;
  const clearedCount = totalAnimals - underWithdrawal;

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between selection:bg-[#1B5E20] selection:text-white font-sans">
      <div>
        <Navbar
          currentRole={roleMode}
          onRoleChange={(newRole) => {
            setRoleMode(newRole);
            if (newRole === 'qr_scanner') setFarmerView('qr_scan');
            else if (newRole === 'farmer') setFarmerView('home');
          }}
        />

        <main className="py-6">
          {/* VETERINARIAN ROLE MODE */}
          {roleMode === 'vet' && <VetDashboard />}

          {/* ADMIN ROLE MODE */}
          {roleMode === 'admin' && <AdminDashboard />}

          {/* PUBLIC QR SCANNER MODE */}
          {roleMode === 'qr_scanner' && (
            <QRScannerModal
              initialToken={selectedQrToken}
              onBack={() => {
                setRoleMode('farmer');
                setFarmerView('home');
              }}
            />
          )}

          {/* FARMER ROLE MODE */}
          {roleMode === 'farmer' && (
            <>
              {farmerView === 'home' && (
                <div className="space-y-12">
                  <FarmerHome
                    onNavigate={(view) => setFarmerView(view)}
                    stats={{
                      totalAnimals,
                      underTreatment,
                      underWithdrawal,
                      clearedCount,
                    }}
                  />

                  {/* Architecture Health Verification Widget */}
                  <div className="max-w-5xl mx-auto px-4 pt-6">
                    <ConnectionStatus />
                  </div>
                </div>
              )}

              {farmerView === 'animals' && (
                <AnimalList
                  animals={animals}
                  onAddAnimal={handleAddAnimal}
                  onSelectAnimalForQr={handleSelectAnimalForQr}
                  onBack={() => setFarmerView('home')}
                />
              )}

              {farmerView === 'treatment' && (
                <TreatmentModal
                  animals={animals}
                  onBack={() => setFarmerView('home')}
                  onSuccess={() => {
                    fetchAnimals();
                    setFarmerView('milk_safety');
                  }}
                />
              )}

              {farmerView === 'milk_safety' && (
                <MilkSafetyCheck onBack={() => setFarmerView('home')} />
              )}

              {farmerView === 'alerts' && (
                <WarningsList onBack={() => setFarmerView('home')} />
              )}

              {farmerView === 'history' && (
                <TreatmentModal
                  animals={animals}
                  onBack={() => setFarmerView('home')}
                  onSuccess={() => setFarmerView('home')}
                />
              )}

              {farmerView === 'qr_scan' && (
                <QRScannerModal
                  initialToken={selectedQrToken}
                  onBack={() => setFarmerView('home')}
                />
              )}
            </>
          )}
        </main>
      </div>

      <footer className="border-t-2 border-[#1B5E20]/20 bg-white py-6 text-center text-xs text-gray-700 font-bold">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-black text-[#1B5E20]">© 2026 FarmSheild Digital Farm Portal • Built for Smart India Hackathon (SIH)</p>
          <p className="text-[11px] text-gray-600 font-bold">
            FSSAI Reference Standards • Express REST API + Supabase PostgreSQL
          </p>
        </div>
      </footer>
    </div>
  );
}
