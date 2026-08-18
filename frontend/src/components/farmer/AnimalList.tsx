'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PlusCircle, QrCode, ArrowLeft, Scale, Calendar, Tag, Edit3, Eye, FileText, Pill, ShieldCheck, X } from 'lucide-react';

export interface AnimalItem {
  id: string;
  animal_code: string;
  species: 'cow' | 'buffalo' | 'goat' | 'sheep';
  breed: string;
  dob: string;
  sex: 'female' | 'male';
  weight: number;
  purpose: string;
  health_status: 'healthy' | 'sick' | 'under_treatment' | 'quarantine';
  notes?: string;
  qr_token: string;
}

interface AnimalListProps {
  animals: AnimalItem[];
  onAddAnimal: (animal: Omit<AnimalItem, 'id' | 'qr_token' | 'health_status'>) => void;
  onEditAnimal?: (id: string, updates: Partial<AnimalItem>) => void;
  onSelectAnimalForQr: (qrToken: string) => void;
  onRecordMedicineForAnimal?: (animalId: string) => void;
  onBack: () => void;
}

export const AnimalList: React.FC<AnimalListProps> = ({
  animals,
  onAddAnimal,
  onEditAnimal,
  onSelectAnimalForQr,
  onRecordMedicineForAnimal,
  onBack,
}) => {
  const { t, language } = useLanguage();
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [editingAnimal, setEditingAnimal] = useState<AnimalItem | null>(null);
  const [viewingAnimal, setViewingAnimal] = useState<AnimalItem | null>(null);
  const [animalProfileData, setAnimalProfileData] = useState<any>(null);

  // Form state
  const [animalCode, setAnimalCode] = useState('');
  const [species, setSpecies] = useState<'cow' | 'buffalo' | 'goat' | 'sheep'>('cow');
  const [breed, setBreed] = useState('');
  const [dob, setDob] = useState('2022-01-15');
  const [sex, setSex] = useState<'female' | 'male'>('female');
  const [weight, setWeight] = useState('400');
  const [purpose, setPurpose] = useState('milk');
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'sick' | 'under_treatment' | 'quarantine'>('healthy');
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setEditingAnimal(null);
    setAnimalCode('');
    setSpecies('cow');
    setBreed('');
    setDob('2022-01-15');
    setSex('female');
    setWeight('400');
    setPurpose('milk');
    setHealthStatus('healthy');
    setNotes('');
    setShowFormModal(true);
  };

  const openEditModal = (animal: AnimalItem) => {
    setEditingAnimal(animal);
    setAnimalCode(animal.animal_code);
    setSpecies(animal.species);
    setBreed(animal.breed);
    setDob(animal.dob || '2022-01-15');
    setSex(animal.sex || 'female');
    setWeight(String(animal.weight || 400));
    setPurpose(animal.purpose || 'milk');
    setHealthStatus(animal.health_status || 'healthy');
    setNotes(animal.notes || '');
    setShowFormModal(true);
  };

  const openViewProfile = async (animal: AnimalItem) => {
    setViewingAnimal(animal);
    setAnimalProfileData(null);
    try {
      const res = await fetch(`http://localhost:5000/api/animals/${animal.id}`);
      const json = await res.json();
      if (json.status === 'success') {
        setAnimalProfileData(json.data);
      }
    } catch {
      // Fallback
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalCode) return;

    if (editingAnimal && onEditAnimal) {
      onEditAnimal(editingAnimal.id, {
        animal_code: animalCode,
        species,
        breed: breed || 'Indigenous',
        dob,
        sex,
        weight: Number(weight),
        purpose,
        health_status: healthStatus,
        notes,
      });
    } else {
      onAddAnimal({
        animal_code: animalCode,
        species,
        breed: breed || (species === 'cow' ? 'Gir' : species === 'buffalo' ? 'Murrah' : 'Local'),
        dob,
        sex,
        weight: Number(weight) || 350,
        purpose,
        notes,
      });
    }

    setShowFormModal(false);
  };

  const speciesEmoji = (s: string) => {
    switch (s.toLowerCase()) {
      case 'cow': return '🐄';
      case 'buffalo': return '🦬';
      case 'goat': return '🐐';
      case 'sheep': return '🐑';
      default: return '🐄';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" size="sm" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          {t('common.backToHome')}
        </Button>
        <Button
          variant="primary"
          onClick={openAddModal}
          leftIcon={<PlusCircle className="w-5 h-5 text-white" />}
          className="bg-[#1B5E20] hover:bg-[#2E7D32]"
        >
          {t('animals.registerNew')}
        </Button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#1B5E20]">{t('animals.title')}</h1>
        <p className="text-xs text-gray-600 font-bold">पशु प्रबंधन, स्वास्थ्य स्थिति एवं दवा रिकॉर्ड</p>
      </div>

      {/* Animal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <Card key={animal.id} variant="glass" className="space-y-4 relative border-2 border-[#1B5E20]/20 p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] border border-[#1B5E20]/30 flex items-center justify-center text-3xl shadow-md">
                    {speciesEmoji(animal.species)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-[#1B5E20]" />
                      <span>{animal.animal_code}</span>
                    </h3>
                    <span className="text-xs text-gray-600 font-bold capitalize">{animal.species} • {animal.breed}</span>
                  </div>
                </div>

                {animal.health_status === 'healthy' ? (
                  <Badge variant="success">स्वस्थ 🟢</Badge>
                ) : animal.health_status === 'under_treatment' ? (
                  <Badge variant="error" pulse>दूध रोको 🔴</Badge>
                ) : (
                  <Badge variant="warning">बीमार 🟡</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-[#FFFDF5] p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center space-x-1.5 text-gray-700 font-bold">
                  <Scale className="w-4 h-4 text-[#1B5E20]" />
                  <span>{animal.weight} kg</span>
                </div>
                <div className="flex items-center space-x-1.5 text-gray-700 font-bold capitalize">
                  <Calendar className="w-4 h-4 text-[#1B5E20]" />
                  <span>{animal.purpose}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openViewProfile(animal)}
                leftIcon={<Eye className="w-4 h-4 text-[#1B5E20]" />}
                className="px-2 text-xs font-bold"
              >
                प्रोफ़ाइल
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => openEditModal(animal)}
                leftIcon={<Edit3 className="w-4 h-4 text-[#1B5E20]" />}
                className="px-2 text-xs font-bold"
              >
                बदलें
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => onSelectAnimalForQr(animal.qr_token)}
                leftIcon={<QrCode className="w-4 h-4 text-white" />}
                className="px-2 text-xs font-bold"
              >
                QR
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* ANIMAL DETAILED PROFILE MODAL */}
      {viewingAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border-2 border-[#1B5E20] rounded-3xl p-6 sm:p-8 w-full max-w-2xl space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{speciesEmoji(viewingAnimal.species)}</span>
                <div>
                  <h2 className="text-2xl font-black text-[#1B5E20]">{viewingAnimal.animal_code}</h2>
                  <p className="text-xs text-gray-600 font-bold capitalize">{viewingAnimal.species} • Breed: {viewingAnimal.breed}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingAnimal(null)}
                className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Clear Status Badges Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#E8F5E9] border border-[#2E7D32]/30 rounded-2xl">
                <span className="text-[11px] text-gray-600 font-bold block mb-1">MILK STATUS</span>
                <span className="text-sm font-black text-[#2E7D32]">
                  {animalProfileData?.milkStatus || (viewingAnimal.health_status === 'under_treatment' ? '🔴 WITHDRAWAL ACTIVE' : '🟢 CLEARED')}
                </span>
              </div>

              <div className="p-3 bg-[#E8F5E9] border border-[#2E7D32]/30 rounded-2xl">
                <span className="text-[11px] text-gray-600 font-bold block mb-1">MEAT STATUS</span>
                <span className="text-sm font-black text-[#2E7D32]">
                  {animalProfileData?.meatStatus || '🟢 CLEARED'}
                </span>
              </div>

              <div className="p-3 bg-[#FFF8E1] border border-[#FFC107]/50 rounded-2xl">
                <span className="text-[11px] text-gray-600 font-bold block mb-1">WITHDRAWAL</span>
                <span className="text-sm font-black text-[#B78103]">
                  {animalProfileData?.withdrawalStatus || (viewingAnimal.health_status === 'under_treatment' ? '🔴 WITHDRAWAL ACTIVE' : '🟢 CLEARED')}
                </span>
              </div>
            </div>

            {/* Detailed Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#FFFDF5] p-4 rounded-2xl border border-gray-200">
              <div>
                <span className="text-gray-500 block">Sex (लिंग):</span>
                <span className="font-bold text-gray-900 capitalize">{viewingAnimal.sex || 'female'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Weight (वज़न):</span>
                <span className="font-bold text-gray-900">{viewingAnimal.weight} kg</span>
              </div>
              <div>
                <span className="text-gray-500 block">Age / DOB:</span>
                <span className="font-bold text-gray-900">{viewingAnimal.dob || '2022-01-15'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Purpose (उपयोग):</span>
                <span className="font-bold text-gray-900 capitalize">{viewingAnimal.purpose}</span>
              </div>
            </div>

            {viewingAnimal.notes && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-700">
                <span className="font-bold block mb-0.5">विशेष टिप्पणी (Notes):</span>
                <p>{viewingAnimal.notes}</p>
              </div>
            )}

            {/* Treatment History Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-black text-[#1B5E20] flex items-center gap-1.5">
                <Pill className="w-4 h-4" />
                <span>दवा और इलाज का इतिहास (Treatment History)</span>
              </h3>

              {animalProfileData?.treatmentHistory && animalProfileData.treatmentHistory.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {animalProfileData.treatmentHistory.map((t: any) => (
                    <div key={t.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-900 block">{t.medicine_name} ({t.dose} {t.dose_unit})</span>
                        <span className="text-gray-500">{t.indication} • Duration: {t.duration} days</span>
                      </div>
                      <span className="text-xs font-bold text-[#1B5E20]">
                        {new Date(t.start_date).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl text-xs text-center text-gray-500">
                  इस पशु का पिछला कोई इलाज दर्ज नहीं है।
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setViewingAnimal(null);
                  openEditModal(viewingAnimal);
                }}
                leftIcon={<Edit3 className="w-4 h-4 text-[#1B5E20]" />}
                className="flex-1"
              >
                जानकारी बदलें (Edit)
              </Button>

              <Button
                variant="primary"
                onClick={() => {
                  setViewingAnimal(null);
                  onSelectAnimalForQr(viewingAnimal.qr_token);
                }}
                leftIcon={<QrCode className="w-4 h-4 text-white" />}
                className="flex-1 bg-[#1B5E20]"
              >
                QR Code देखें
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT ANIMAL FORM MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border-2 border-[#1B5E20] rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-black text-[#1B5E20]">
                {editingAnimal ? 'पशु की जानकारी बदलें (Edit Animal)' : t('animals.registerNew')}
              </h2>
              <button
                onClick={() => setShowFormModal(false)}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-bold text-gray-800">
              <div>
                <label className="block text-gray-700 mb-1">{t('animals.animalCode')} *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा: COW-104, BUF-203"
                  value={animalCode}
                  onChange={(e) => setAnimalCode(e.target.value)}
                  className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-900 focus:border-[#1B5E20] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">{t('animals.species')} *</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value as any)}
                    className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl px-3 py-3 text-sm text-gray-900 focus:border-[#1B5E20] focus:outline-none"
                  >
                    <option value="cow">🐄 Cow (गाय)</option>
                    <option value="buffalo">🦬 Buffalo (भैंस)</option>
                    <option value="goat">🐐 Goat (बकरी)</option>
                    <option value="sheep">🐑 Sheep (भेड़)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">{t('animals.breed')}</label>
                  <input
                    type="text"
                    placeholder="उदा: Gir, Murrah, Sahiwal"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl px-3 py-3 text-sm text-gray-900 focus:border-[#1B5E20] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Sex (लिंग)</label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value as any)}
                    className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl px-3 py-3 text-sm text-gray-900 focus:border-[#1B5E20] focus:outline-none"
                  >
                    <option value="female">Female (मादा)</option>
                    <option value="male">Male (नर)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">{t('animals.weight')} (kg) *</label>
                  <input
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl px-3 py-3 text-sm text-gray-900 focus:border-[#1B5E20] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Purpose (उपयोग)</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl px-3 py-3 text-sm text-gray-900 focus:border-[#1B5E20] focus:outline-none"
                  >
                    <option value="milk">Milk (दूध उत्पादन)</option>
                    <option value="meat">Meat (मांस)</option>
                    <option value="breeding">Breeding (प्रजनन)</option>
                    <option value="other">Other (अन्य)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Health Status</label>
                  <select
                    value={healthStatus}
                    onChange={(e) => setHealthStatus(e.target.value as any)}
                    className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl px-3 py-3 text-sm text-gray-900 focus:border-[#1B5E20] focus:outline-none"
                  >
                    <option value="healthy">Healthy (स्वस्थ 🟢)</option>
                    <option value="sick">Sick (बीमार 🟡)</option>
                    <option value="under_treatment">Under Treatment (दवा चालू 🔴)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Notes (विशेष टिप्पणी)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="पशु की पहचान चिन्ह या स्वास्थ्य टिप्पणी..."
                  className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl p-3 text-sm text-gray-900 focus:border-[#1B5E20] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="ghost" onClick={() => setShowFormModal(false)}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit" variant="primary" className="bg-[#1B5E20]">
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
