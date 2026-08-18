import React from 'react';
import { ShieldCheck, Activity, Database, Server } from 'lucide-react';
import { Badge } from './Badge';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 border border-emerald-400/30">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                FarmSheild
              </span>
              <Badge variant="success" pulse size="sm">
                Foundation v1.0
              </Badge>
            </div>
            <p className="text-xs text-slate-400 font-medium">Digital Farm & Health Portal</p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-slate-300 font-medium">
          <div className="flex items-center space-x-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>Next.js Frontend</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Express API</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase DB</span>
          </div>
        </div>
      </div>
    </header>
  );
};
