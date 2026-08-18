'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowLeft, QrCode, Search, CheckCircle2, ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';

interface QRScannerModalProps {
  initialToken?: string;
  onBack: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ initialToken = '', onBack }) => {
  const { t, language } = useLanguage();
  const [token, setToken] = useState<string>(initialToken || 'QR-COW-102');
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLookup = async (tokenToUse?: string) => {
    const searchToken = tokenToUse || token;
    if (!searchToken) return;

    setLoading(true);
    setErrorMsg(null);
    setProfile(null);

    try {
      const res = await fetch(`http://localhost:5000/api/animals/qr/${encodeURIComponent(searchToken)}`);
      const json = await res.json();
      if (json.status === 'success') {
        setProfile(json.data);
      } else {
        setErrorMsg(json.message || 'No record found');
      }
    } catch {
      setErrorMsg('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4 py-6">
      <Button variant="outline" size="sm" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
        {t('common.backToHome')}
      </Button>

      <Card variant="glass" className="space-y-6 border-2 border-[#1B5E20]/30 shadow-xl p-6 sm:p-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#E8F5E9] border border-[#1B5E20]/30 rounded-2xl text-[#1B5E20]">
            <QrCode className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#1B5E20]">{t('qr.scannerTitle')}</h1>
            <p className="text-xs text-gray-600 font-bold">{t('qr.scanSubtitle')}</p>
          </div>
        </div>

        {/* Input & Lookup */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={t('qr.enterTokenPlaceholder')}
              className="w-full bg-[#FFFDF5] border-2 border-gray-300 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-900 font-mono focus:border-[#1B5E20] focus:outline-none font-bold"
            />
          </div>
          <Button variant="primary" onClick={() => handleLookup()} isLoading={loading} className="bg-[#1B5E20]">
            {t('qr.lookupBtn')}
          </Button>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="text-gray-500 self-center">उदा (Presets):</span>
          <button
            onClick={() => { setToken('QR-COW-101'); handleLookup('QR-COW-101'); }}
            className="px-3 py-1.5 bg-[#E8F5E9] border border-[#1B5E20]/30 rounded-xl text-[#1B5E20]"
          >
            QR-COW-101 (🟢 CLEARED)
          </button>
          <button
            onClick={() => { setToken('QR-COW-102'); handleLookup('QR-COW-102'); }}
            className="px-3 py-1.5 bg-[#FFEBEE] border border-[#D32F2F]/30 rounded-xl text-[#D32F2F]"
          >
            QR-COW-102 (🔴 WITHDRAWAL ACTIVE)
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 bg-[#FFEBEE] border border-[#D32F2F]/40 rounded-2xl text-[#D32F2F] text-xs font-bold">
            {errorMsg}
          </div>
        )}

        {/* Privacy-Safe QR Safety Card */}
        {profile && (
          <div className="bg-[#FFFDF5] border-2 border-[#1B5E20]/40 rounded-3xl p-6 space-y-6 shadow-md">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <span className="text-xs text-gray-500 font-bold block">ANIMAL ID</span>
                <span className="text-3xl font-black text-[#1B5E20]">{profile.animalCode}</span>
              </div>
              <Badge
                variant={profile.withdrawalStatus.includes('CLEARED') ? 'success' : 'error'}
                size="lg"
                pulse
                className="px-5 py-2 text-sm"
              >
                {profile.withdrawalStatus}
              </Badge>
            </div>

            {/* Milk & Meat Status Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border-2 border-gray-200 text-center space-y-1">
                <span className="text-xs text-gray-500 font-bold block">🥛 MILK STATUS</span>
                <span className="text-sm font-black text-[#2E7D32]">
                  {profile.milkStatus}
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border-2 border-gray-200 text-center space-y-1">
                <span className="text-xs text-gray-500 font-bold block">🥩 MEAT STATUS</span>
                <span className="text-sm font-black text-[#2E7D32]">
                  {profile.meatStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-white p-4 rounded-2xl border border-gray-200">
              <div>
                <span className="text-gray-500 font-bold block">Species (प्रजाति):</span>
                <span className="font-extrabold text-gray-900 capitalize">{profile.species} ({profile.breed})</span>
              </div>
              <div>
                <span className="text-gray-500 font-bold block">Safe Date (सुरक्षित तारीख):</span>
                <span className="font-extrabold text-[#1B5E20]">
                  {new Date(profile.safeDate).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 text-center font-semibold leading-relaxed border-t border-gray-200 pt-3">
              🔒 Privacy-Safe Certificate • No private owner or medical notes exposed • FSSAI Regulatory Support
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
