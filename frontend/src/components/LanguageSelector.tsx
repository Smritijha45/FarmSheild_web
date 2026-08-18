'use client';

import React from 'react';
import { useLanguage } from '../providers/LanguageProvider';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center bg-[#E8F5E9] border-2 border-[#1B5E20]/30 rounded-2xl p-1 shadow-sm">
      <div className="flex items-center pl-2 pr-1 text-[#1B5E20]">
        <Globe className="w-4 h-4" />
      </div>

      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => setLanguage('hi')}
          className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all duration-200 ${
            language === 'hi'
              ? 'bg-[#1B5E20] text-white shadow-md'
              : 'text-[#1B5E20] hover:bg-white/60'
          }`}
          title="हिंदी में बदलें"
        >
          🇮🇳 हिंदी
        </button>

        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all duration-200 ${
            language === 'en'
              ? 'bg-[#1B5E20] text-white shadow-md'
              : 'text-[#1B5E20] hover:bg-white/60'
          }`}
          title="Switch to English"
        >
          🇬🇧 English
        </button>
      </div>
    </div>
  );
};
