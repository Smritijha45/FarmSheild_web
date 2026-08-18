import React from 'react';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { ShieldCheck, Cpu, Database, CheckCircle2, ArrowRight, Zap, Lock, FileCode2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero Header Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="success" pulse>
              Phase 1 Monorepo Foundation
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Digital Farm Management Portal
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Welcome to <span className="text-emerald-400 font-semibold">FarmSheild</span>. Built on Next.js, Express REST API, and Supabase PostgreSQL database layer.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900/90 text-emerald-300 px-3.5 py-2 rounded-xl border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next.js App Router</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900/90 text-teal-300 px-3.5 py-2 rounded-xl border border-teal-500/20">
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              <span>Express TypeScript REST API</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900/90 text-emerald-300 px-3.5 py-2 rounded-xl border border-emerald-500/20">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase PostgreSQL & Auth</span>
            </div>
          </div>
        </div>

        {/* Live End-to-End Connectivity Diagnostic Widget */}
        <section id="verification" className="space-y-4">
          <ConnectionStatus />
        </section>

        {/* Foundation Feature Stack Overview */}
        <section className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Monorepo Setup & Features Ready</h2>
            <p className="text-sm text-slate-400">Core architectural components configured for modular expansion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="glass" hoverEffect>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Clean Monorepo Structure</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Strict decoupling with <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">/frontend</code> and <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">/backend</code> workspaces.
              </p>
              <ul className="text-xs space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>TypeScript strict type checking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>ESLint code quality enforcement</span>
                </li>
              </ul>
            </Card>

            <Card variant="glass" hoverEffect>
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Express API Middleware</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Production-grade Express middleware pipeline ready for REST endpoint expansion.
              </p>
              <ul className="text-xs space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>CORS & Helmet HTTP security</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Centralized JSON error handling</span>
                </li>
              </ul>
            </Card>

            <Card variant="glass" hoverEffect>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Supabase PostgreSQL Schema</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Database schema defined with Row Level Security (RLS) policies and trigger functions.
              </p>
              <ul className="text-xs space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>12 relational SQL tables defined</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Supabase JS Client initialized</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}
