'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Stethoscope, Settings, QrCode } from 'lucide-react';
import { LanguageSelector } from '../LanguageSelector';
import { useLanguage } from '../../providers/LanguageProvider';

export type UserRoleMode = 'farmer' | 'vet' | 'admin' | 'qr_scanner';

interface NavbarProps {
  currentRole?: UserRoleMode;
  onRoleChange?: (role: UserRoleMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole = 'farmer',
  onRoleChange,
}) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#1B5E20]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none"
          onClick={() => onRoleChange?.('farmer')}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#1B5E20] flex items-center justify-center shadow-lg text-white">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1B5E20]">
                {t('nav.brand')}
              </span>
            </div>
            <p className="text-xs text-[#1B5E20] font-bold hidden sm:block">
              {t('nav.tagline')}
            </p>
          </div>
        </div>

        {/* Role Switcher Tabs */}
        {onRoleChange && (
          <div className="hidden lg:flex items-center bg-[#E8F5E9] border-2 border-[#1B5E20]/30 p-1.5 rounded-2xl gap-1 text-xs font-black">
            <button
              onClick={() => onRoleChange('farmer')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                currentRole === 'farmer'
                  ? 'bg-[#1B5E20] text-white shadow-md'
                  : 'text-[#1B5E20] hover:bg-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('nav.farmerRole')}</span>
            </button>

            <button
              onClick={() => onRoleChange('vet')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                currentRole === 'vet'
                  ? 'bg-[#1B5E20] text-white shadow-md'
                  : 'text-[#1B5E20] hover:bg-white'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t('nav.vetRole')}</span>
            </button>

            <button
              onClick={() => onRoleChange('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                currentRole === 'admin'
                  ? 'bg-[#1B5E20] text-white shadow-md'
                  : 'text-[#1B5E20] hover:bg-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{t('nav.adminRole')}</span>
            </button>

            <button
              onClick={() => onRoleChange('qr_scanner')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                currentRole === 'qr_scanner'
                  ? 'bg-[#1B5E20] text-white shadow-md'
                  : 'text-[#1B5E20] hover:bg-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{t('nav.qrScan')}</span>
            </button>
          </div>
        )}

        {/* Global Language Selector */}
        <div className="flex items-center space-x-2">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
