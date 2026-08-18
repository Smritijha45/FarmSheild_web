'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '../../../providers/LanguageProvider';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ShieldCheck, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function PublicQRPage() {
  const params = useParams();
  const qrToken = (params?.qr_token as string) || '';
  const { t, language } = useLanguage();

  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!qrToken) return;

    fetch(`http://localhost:5000/api/animals/qr/${encodeURIComponent(qrToken)}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'success') {
          setProfile(json.data);
        } else {
          setError(json.message || 'Animal QR Profile not found');
        }
      })
      .catch(() => setError('Server connection error'))
      .finally(() => setLoading(false));
  }, [qrToken]);

  return (
    <div className="min-h-screen bg-[#FFFDF5] py-12 px-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg">
        <Card variant="glass" className="space-y-6 shadow-2xl border-2 border-[#1B5E20]/40 bg-white p-8 rounded-3xl relative overflow-hidden">
          {/* Top Brand Header */}
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#1B5E20]">{t('qr.publicProfileTitle')}</h1>
              <p className="text-xs text-gray-600 font-bold">{t('qr.publicNotice')}</p>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-bold text-sm">{t('common.loading')}</div>
          ) : error ? (
            <div className="p-6 bg-[#FFEBEE] border border-[#D32F2F] rounded-2xl text-[#D32F2F] text-center text-xs font-bold">
              {error}
            </div>
          ) : profile ? (
            <div className="space-y-6">
              {/* Overall Withdrawal Status Banner */}
              <div className="text-center space-y-3 py-5 bg-[#FFFDF5] rounded-3xl border-2 border-gray-200">
                <span className="text-xs text-gray-500 font-bold block">{t('qr.safetyStatus')}</span>
                <Badge
                  variant={profile.withdrawalStatus.includes('CLEARED') ? 'success' : 'error'}
                  size="lg"
                  pulse
                  className="px-6 py-2.5 text-base font-black"
                >
                  {profile.withdrawalStatus}
                </Badge>
              </div>

              {/* Milk & Meat Status Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#FFFDF5] rounded-2xl border-2 border-gray-200 text-center space-y-1">
                  <span className="text-xs text-gray-500 font-bold block">🥛 MILK STATUS</span>
                  <span className="text-sm font-black text-[#2E7D32]">
                    {profile.milkStatus}
                  </span>
                </div>

                <div className="p-4 bg-[#FFFDF5] rounded-2xl border-2 border-gray-200 text-center space-y-1">
                  <span className="text-xs text-gray-500 font-bold block">🥩 MEAT STATUS</span>
                  <span className="text-sm font-black text-[#2E7D32]">
                    {profile.meatStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-[#FFFDF5] p-4 rounded-2xl border border-gray-200">
                  <span className="text-gray-500 font-bold block">{t('qr.tagCode')}</span>
                  <span className="text-xl font-black text-[#1B5E20]">{profile.animalCode}</span>
                </div>

                <div className="bg-[#FFFDF5] p-4 rounded-2xl border border-gray-200">
                  <span className="text-gray-500 font-bold block">{t('qr.speciesBreed')}</span>
                  <span className="text-sm font-black text-gray-900 capitalize">{profile.species} ({profile.breed})</span>
                </div>
              </div>

              <div className="bg-[#FFFDF5] p-4 rounded-2xl border border-gray-200 text-xs flex justify-between items-center">
                <span className="text-gray-700 font-bold">दूध बेचना कब से सुरक्षित:</span>
                <span className="text-base font-black text-[#1B5E20]">
                  {new Date(profile.safeDate).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <p className="text-[11px] text-gray-500 text-center font-bold leading-relaxed border-t border-gray-200 pt-3">
                🔒 Privacy-Safe Public Badge • Certified by FarmSheild MRL Engine
              </p>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
