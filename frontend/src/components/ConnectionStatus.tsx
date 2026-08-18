'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, XCircle, Server, Database, Monitor, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { fetchBackendHealth, HealthCheckResponse } from '../lib/api';

export const ConnectionStatus: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastCheckTime, setLastCheckTime] = useState<string | null>(null);

  const runHealthCheck = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    const response = await fetchBackendHealth();

    if (response.success && response.data) {
      setHealthData(response.data);
    } else {
      setErrorMsg(response.error || 'Failed to connect to backend server.');
      setHealthData(null);
    }

    setLastCheckTime(new Date().toLocaleTimeString());
    setLoading(false);
  }, []);

  useEffect(() => {
    runHealthCheck();
  }, [runHealthCheck]);

  const expressStatus = healthData?.services.expressApi.status === 'healthy';
  const supabaseConnected = healthData?.services.supabase.connected ?? false;
  const supabaseConfigured = healthData?.services.supabase.configured ?? false;

  return (
    <Card variant="glass" className="w-full max-w-4xl mx-auto shadow-2xl relative overflow-hidden border border-emerald-500/30">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-950/80 border border-emerald-600/30 rounded-xl text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              System Architecture & Health Verification
            </h3>
            <p className="text-xs text-slate-400">
              Live status pinging: <span className="text-emerald-400 font-medium">Frontend</span> → <span className="text-teal-400 font-medium">Express API</span> → <span className="text-emerald-400 font-medium">Supabase DB</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 self-end sm:self-center">
          {lastCheckTime && (
            <span className="text-xs text-slate-500 hidden md:inline">
              Last checked: {lastCheckTime}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={runHealthCheck}
            isLoading={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Re-test Connectivity
          </Button>
        </div>
      </div>

      {/* Connection Flow Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Node 1: Next.js Frontend */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-slate-200">
              <Monitor className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-sm">Frontend</span>
            </div>
            <Badge variant="success" pulse>
              Active
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mb-2">Next.js 14 App Router (Client & Server Components)</p>
          <div className="text-[11px] text-emerald-400/90 font-mono bg-slate-950/60 p-2 rounded border border-slate-800/80">
            http://localhost:3000
          </div>
        </div>

        {/* Arrow / Connector 1 */}
        <div className="hidden md:flex items-center justify-center -mx-2 z-10 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Node 2: Express API */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-slate-200">
              <Server className="w-5 h-5 text-teal-400" />
              <span className="font-semibold text-sm">Express REST API</span>
            </div>
            {loading ? (
              <Badge variant="neutral">Checking...</Badge>
            ) : expressStatus ? (
              <Badge variant="success" pulse>
                Online
              </Badge>
            ) : (
              <Badge variant="error">Offline</Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mb-2">Express.js TypeScript Server with CORS & Helmet</p>
          <div className="text-[11px] text-slate-300 font-mono bg-slate-950/60 p-2 rounded border border-slate-800/80 truncate">
            {healthData ? `${healthData.appName} (${healthData.services.expressApi.uptimeSeconds}s uptime)` : 'http://localhost:5000/api/health'}
          </div>
        </div>

        {/* Node 3: Supabase Database */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-slate-200">
              <Database className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-sm">Supabase DB</span>
            </div>
            {loading ? (
              <Badge variant="neutral">Checking...</Badge>
            ) : supabaseConnected ? (
              <Badge variant="success" pulse>
                Connected
              </Badge>
            ) : supabaseConfigured ? (
              <Badge variant="warning">Unreachable</Badge>
            ) : (
              <Badge variant="info">Config Required</Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mb-2">PostgreSQL Database & Auth Client</p>
          <div className="text-[11px] text-slate-300 font-mono bg-slate-950/60 p-2 rounded border border-slate-800/80 truncate">
            {supabaseConnected
              ? 'PostgreSQL Query Verified'
              : supabaseConfigured
              ? 'Credentials configured, awaiting live connection'
              : 'Provide SUPABASE_URL in backend .env'}
          </div>
        </div>
      </div>

      {/* Detailed Status & Logs Box */}
      <div className="bg-slate-950/90 rounded-xl border border-slate-800/80 p-4">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Diagnostic Endpoint Logs & Payload
        </h4>

        {errorMsg ? (
          <div className="flex items-start space-x-3 p-3 bg-rose-950/40 border border-rose-900/50 rounded-lg text-rose-300 text-xs">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-1">Backend Connection Error</span>
              <p className="text-rose-200/90">{errorMsg}</p>
              <p className="mt-2 text-slate-400">
                Tip: Ensure the Express server is running on port 5000 using <code className="text-emerald-400">cd backend && npm run dev</code>.
              </p>
            </div>
          </div>
        ) : healthData ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
              <span className="text-slate-400">API Endpoint:</span>
              <code className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
                GET /api/health
              </code>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
              <span className="text-slate-400">Supabase Connection Message:</span>
              <span className="text-slate-200 flex items-center gap-1.5 font-medium">
                {supabaseConnected ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                )}
                {healthData.services.supabase.message}
              </span>
            </div>
            <pre className="text-[11px] font-mono bg-slate-900/90 p-3 rounded-lg text-emerald-300/90 overflow-x-auto border border-slate-800">
              {JSON.stringify(healthData, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            Running system diagnostics...
          </div>
        )}
      </div>
    </Card>
  );
};
