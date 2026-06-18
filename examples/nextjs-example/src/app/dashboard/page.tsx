'use client';

import { useState, useEffect } from 'react';
import { getDeviceFingerprint } from '@/lib/kavach';

export default function DashboardOverview() {
  const [trustScore, setTrustScore] = useState<number>(0);
  const [showStepUp, setShowStepUp] = useState(false);
  const [stepUpStatus, setStepUpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const score = localStorage.getItem('kavach_trust_score');
    if (score) {
      setTimeout(() => {
        setTrustScore(parseInt(score, 10));
      }, 100);
    }
  }, []);

  const handleStepUp = async () => {
    setStepUpStatus('loading');
    
    // In a real app, this would trigger the native WebAuthn prompt again.
    // We simulate the prompt delay, then call the backend API
    setTimeout(async () => {
      try {
        const fp = await getDeviceFingerprint();
        
        const response = await fetch('http://localhost:4000/api/example-app/transfer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fingerprint: fp.fingerprint })
        });

        if (!response.ok) throw new Error('Transfer denied');

        setStepUpStatus('success');
        setTimeout(() => {
          setShowStepUp(false);
          setStepUpStatus('idle');
        }, 2000);
      } catch {
        setStepUpStatus('idle');
        alert("Step-Up Authentication Failed. Transfer denied.");
      }
    }, 1500);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
            <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
              Zero Trust Enabled
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Real-time security telemetry for your active session.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 p-4">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            
            <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-800 transition-colors"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all duration-1000 ease-out"
                  strokeDasharray={`${trustScore}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="relative flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{trustScore}</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mt-1">Score</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Live Trust Score</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Based on hardware fingerprint and network heuristics.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Device Trust</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Trusted hardware detected.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Continuous Monitoring</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Risk engine actively evaluating.</p>
          </div>
        </div>

        {/* Example Action requiring Step-up auth */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-2xl relative shadow-sm dark:shadow-none">
          {showStepUp && (
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center">
              {stepUpStatus === 'idle' && (
                <div className="text-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-w-sm">
                  <div className="mx-auto w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Step-Up Authentication</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">This action requires a biometric hardware check to proceed.</p>
                  <button 
                    onClick={handleStepUp}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Proceed with Passkey
                  </button>
                  <button 
                    onClick={() => setShowStepUp(false)}
                    className="mt-3 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
              {stepUpStatus === 'loading' && (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">Awaiting biometrics...</p>
                </div>
              )}
              {stepUpStatus === 'success' && (
                <div className="text-center text-green-600 dark:text-green-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-bold text-lg">Identity Verified!</p>
                </div>
              )}
            </div>
          )}

          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Secure Financial Data</h2>
          <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 font-mono text-sm border border-slate-200 dark:border-slate-800 mb-6 text-slate-800 dark:text-slate-300">
            <div className="text-green-600 dark:text-green-400 mb-2">{/* Restricted Access Area */}</div>
            <div>Account Balance: <span className="text-slate-900 dark:text-white font-bold">$1,450,299.00</span></div>
            <div>Pending Transfers: <span className="text-slate-900 dark:text-white font-bold">0</span></div>
          </div>
          
          <button 
            onClick={() => setShowStepUp(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Initiate Wire Transfer
          </button>
        </div>

      </div>
    </div>
  );
}
