'use client';

import React from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PlusCircle, ArrowRight } from 'lucide-react';

interface FarmerHomeProps {
  onNavigate: (view: 'animals' | 'treatment' | 'milk_safety' | 'alerts' | 'history' | 'qr_scan') => void;
  stats: {
    totalAnimals: number;
    underTreatment: number;
    underWithdrawal: number;
    clearedCount: number;
  };
}

export const FarmerHome: React.FC<FarmerHomeProps> = ({ onNavigate, stats }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-[#1B5E20] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <Badge variant="success" className="bg-white text-[#1B5E20] border-none font-black">
                {t('farmerHome.greeting')}
              </Badge>
              <span className="text-xs text-[#E8F5E9] font-bold">Farm: IND-UP-8842</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {t('farmerHome.subGreeting')}
            </h1>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => onNavigate('treatment')}
            leftIcon={<PlusCircle className="w-6 h-6 text-[#1B5E20]" />}
            className="shadow-xl bg-white hover:bg-[#E8F5E9] text-[#1B5E20] font-black text-base border-none"
          >
            {t('farmerHome.actions.recordMedicine')}
          </Button>
        </div>
      </div>

      {/* 4 Green & White Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Animals */}
        <div className="bg-white border-2 border-[#1B5E20] rounded-3xl p-5 flex flex-col justify-between shadow-md">
          <span className="text-xs sm:text-sm text-[#1B5E20] font-black">Total Animals</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-black text-[#1B5E20]">{stats.totalAnimals}</span>
            <span className="text-xs text-[#1B5E20] font-bold">पशु</span>
          </div>
        </div>

        {/* Under Treatment */}
        <div className="bg-white border-2 border-[#1B5E20]/40 rounded-3xl p-5 flex flex-col justify-between shadow-md">
          <span className="text-xs sm:text-sm text-[#1B5E20] font-black">Under Treatment</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-black text-[#1B5E20]">{stats.underTreatment}</span>
            <span className="text-xs text-[#1B5E20] font-bold">इलाज चालू</span>
          </div>
        </div>

        {/* Under Withdrawal */}
        <div className="bg-white border-2 border-[#1B5E20]/60 rounded-3xl p-5 flex flex-col justify-between shadow-md">
          <span className="text-xs sm:text-sm text-[#1B5E20] font-black">Under Withdrawal</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-black text-[#1B5E20]">{stats.underWithdrawal}</span>
            <span className="text-xs text-[#1B5E20] font-bold">दूध रोको</span>
          </div>
        </div>

        {/* Cleared */}
        <div className="bg-white border-2 border-[#1B5E20] rounded-3xl p-5 flex flex-col justify-between shadow-md">
          <span className="text-xs sm:text-sm text-[#1B5E20] font-black">Cleared</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-black text-[#1B5E20]">{stats.clearedCount}</span>
            <span className="text-xs text-[#1B5E20] font-bold">सुरक्षित</span>
          </div>
        </div>
      </div>

      {/* 6 Large Action Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-[#1B5E20] flex items-center gap-2">
          <span>मुख्य कार्य (Actions)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: My Animals */}
          <Card
            variant="glass"
            hoverEffect
            onClick={() => onNavigate('animals')}
            className="cursor-pointer border-2 border-[#1B5E20] hover:bg-[#E8F5E9]/50 flex flex-col justify-between group p-6"
          >
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] border-2 border-[#1B5E20] flex items-center justify-center text-4xl shadow-md">
                🐄
              </div>
              <ArrowRight className="w-6 h-6 text-[#1B5E20] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-6 space-y-1">
              <h3 className="text-xl font-black text-[#1B5E20] transition-colors">
                {t('farmerHome.actions.myAnimals')}
              </h3>
              <p className="text-xs text-gray-700 font-bold">{t('farmerHome.actions.myAnimalsDesc')}</p>
            </div>
          </Card>

          {/* Card 2: Medicine */}
          <Card
            variant="glass"
            hoverEffect
            onClick={() => onNavigate('treatment')}
            className="cursor-pointer border-2 border-[#1B5E20] hover:bg-[#E8F5E9]/50 flex flex-col justify-between group p-6"
          >
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] border-2 border-[#1B5E20] flex items-center justify-center text-4xl shadow-md">
                💊
              </div>
              <ArrowRight className="w-6 h-6 text-[#1B5E20] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-6 space-y-1">
              <h3 className="text-xl font-black text-[#1B5E20] transition-colors">
                {t('farmerHome.actions.recordMedicine')}
              </h3>
              <p className="text-xs text-gray-700 font-bold">{t('farmerHome.actions.recordMedicineDesc')}</p>
            </div>
          </Card>

          {/* Card 3: Is My Milk Safe? */}
          <Card
            variant="glass"
            hoverEffect
            onClick={() => onNavigate('milk_safety')}
            className="cursor-pointer border-2 border-[#1B5E20] hover:bg-[#E8F5E9]/50 flex flex-col justify-between group p-6 relative overflow-hidden"
          >
            {stats.underWithdrawal > 0 && (
              <span className="absolute top-4 right-4 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B5E20] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#1B5E20]"></span>
              </span>
            )}
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] border-2 border-[#1B5E20] flex items-center justify-center text-4xl shadow-md">
                🥛
              </div>
              <ArrowRight className="w-6 h-6 text-[#1B5E20] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-6 space-y-1">
              <h3 className="text-xl font-black text-[#1B5E20] transition-colors">
                {t('farmerHome.actions.isMilkSafe')}
              </h3>
              <p className="text-xs text-gray-700 font-bold">{t('farmerHome.actions.isMilkSafeDesc')}</p>
            </div>
          </Card>

          {/* Card 4: Warnings */}
          <Card
            variant="glass"
            hoverEffect
            onClick={() => onNavigate('alerts')}
            className="cursor-pointer border-2 border-[#1B5E20] hover:bg-[#E8F5E9]/50 flex flex-col justify-between group p-6"
          >
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] border-2 border-[#1B5E20] flex items-center justify-center text-4xl shadow-md">
                ⚠️
              </div>
              <ArrowRight className="w-6 h-6 text-[#1B5E20] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-6 space-y-1">
              <h3 className="text-xl font-black text-[#1B5E20] transition-colors">
                {t('farmerHome.actions.warnings')}
              </h3>
              <p className="text-xs text-gray-700 font-bold">{t('farmerHome.actions.warningsDesc')}</p>
            </div>
          </Card>

          {/* Card 5: My Records */}
          <Card
            variant="glass"
            hoverEffect
            onClick={() => onNavigate('history')}
            className="cursor-pointer border-2 border-[#1B5E20] hover:bg-[#E8F5E9]/50 flex flex-col justify-between group p-6"
          >
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] border-2 border-[#1B5E20] flex items-center justify-center text-4xl shadow-md">
                📋
              </div>
              <ArrowRight className="w-6 h-6 text-[#1B5E20] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-6 space-y-1">
              <h3 className="text-xl font-black text-[#1B5E20] transition-colors">
                {t('farmerHome.actions.myRecords')}
              </h3>
              <p className="text-xs text-gray-700 font-bold">{t('farmerHome.actions.myRecordsDesc')}</p>
            </div>
          </Card>

          {/* Card 6: Scan Animal */}
          <Card
            variant="glass"
            hoverEffect
            onClick={() => onNavigate('qr_scan')}
            className="cursor-pointer border-2 border-[#1B5E20] hover:bg-[#E8F5E9]/50 flex flex-col justify-between group p-6"
          >
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] border-2 border-[#1B5E20] flex items-center justify-center text-4xl shadow-md">
                📷
              </div>
              <ArrowRight className="w-6 h-6 text-[#1B5E20] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-6 space-y-1">
              <h3 className="text-xl font-black text-[#1B5E20] transition-colors">
                {t('farmerHome.actions.scanQr')}
              </h3>
              <p className="text-xs text-gray-700 font-bold">{t('farmerHome.actions.scanQrDesc')}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
