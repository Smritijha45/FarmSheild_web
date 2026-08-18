'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Stethoscope, Activity, AlertTriangle, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { AMUAnalytics } from './AMUAnalytics';

export const VetDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'clinical' | 'amu'>('clinical');

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6 font-sans">
      {/* Vet Header Banner */}
      <div className="bg-[#1B5E20] text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#1B5E20] flex items-center justify-center text-3xl shadow-lg">
              🩺
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{t('vet.title')}</h1>
                <Badge variant="success" className="bg-white text-[#1B5E20] border-none font-black">
                  Dr. Sharma (VET-882)
                </Badge>
              </div>
              <p className="text-xs text-[#E8F5E9] font-bold">{t('vet.subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center bg-white border-2 border-white p-1.5 rounded-2xl text-xs font-black self-end sm:self-center">
            <button
              onClick={() => setActiveTab('clinical')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'clinical' ? 'bg-[#1B5E20] text-white shadow-md' : 'text-[#1B5E20] hover:bg-[#E8F5E9]'
              }`}
            >
              {t('vet.activeTreatments')}
            </button>
            <button
              onClick={() => setActiveTab('amu')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'amu' ? 'bg-[#1B5E20] text-white shadow-md' : 'text-[#1B5E20] hover:bg-[#E8F5E9]'
              }`}
            >
              {t('vet.amuTrend')}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'amu' ? (
        <AMUAnalytics />
      ) : (
        <div className="space-y-6">
          {/* Active Clinical Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="glass" className="space-y-4 border-2 border-[#FFC107] bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-[#B78103]" />
                  <span>{t('vet.repeatedAlerts')}</span>
                </h3>
                <Badge variant="warning">1 Alert</Badge>
              </div>

              <div className="bg-[#FFF8E1] p-5 rounded-2xl border-2 border-[#FFC107]/40 space-y-3 text-xs font-bold text-gray-900">
                <div className="flex justify-between items-center">
                  <span className="font-black text-base text-[#B78103]">COW-102 (Gir Cross)</span>
                  <span className="text-gray-700">Farm: Sharma Dairy</span>
                </div>
                <p className="text-gray-800 leading-relaxed font-semibold">
                  ⚠️ 2nd Antimicrobial course of Amoxicillin recorded within 30 days. Risk of AMR (Antimicrobial Resistance).
                </p>
                <div className="pt-2">
                  <Button variant="primary" size="md" className="w-full justify-center bg-[#1B5E20] text-white">
                    {t('vet.approveTreatment')}
                  </Button>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="space-y-4 border-2 border-[#1B5E20] bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#1B5E20]" />
                  <span>Withdrawal Compliance Reviews</span>
                </h3>
                <Badge variant="success">FSSAI Compliant</Badge>
              </div>

              <div className="bg-[#E8F5E9] p-5 rounded-2xl border-2 border-[#1B5E20]/30 space-y-3 text-xs font-bold text-gray-900">
                <div className="flex justify-between items-center">
                  <span className="font-black text-base text-[#1B5E20]">BUF-201 (Murrah Buffalo)</span>
                  <Badge variant="success">Cleared</Badge>
                </div>
                <p className="text-gray-800 leading-relaxed font-semibold">
                  Oxytetracycline LA treatment completed. 7-day milk withdrawal successfully observed.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
