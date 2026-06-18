'use client';

import { useState, useEffect } from 'react';

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

  const handleStepUp = () => {
    setStepUpStatus('loading');
    setTimeout(() => {
      // Simulate successful step-up via Kavach passkey/biometric
      setStepUpStatus('success');
      setTimeout(() => setShowStepUp(false), 2000);
    }, 1500);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <span>Overview</span>
            <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/20 uppercase tracking-wider font-semibold">
              Zero Trust Enabled
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time security telemetry for your active session.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trust Score Widget */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            
            <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
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
                <span className="text-4xl font-bold text-white tracking-tight">{trustScore}</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">Score</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg">Live Trust Score</h3>
            <p className="text-xs text-slate-400 mt-1">Based on hardware fingerprint and network heuristics.</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold">Device Trust</h3>
            <p className="text-sm text-slate-400">Trusted hardware detected.</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold">Continuous Monitoring</h3>
            <p className="text-sm text-slate-400">Risk engine actively evaluating.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-lg font-semibold mb-4">Secure Financial Data</h2>
            <div className="p-4 bg-slate-950 rounded-lg font-mono text-sm text-slate-300 border border-slate-800">
              <p className="mb-2 text-green-400">// Restricted Access Area</p>
              <p>Account Balance: <span className="text-white">$1,450,299.00</span></p>
              <p>Pending Transfers: <span className="text-white">0</span></p>
            </div>
            
            <button 
              onClick={() => { setStepUpStatus('idle'); setShowStepUp(true); }}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all"
            >
              Initiate Wire Transfer
            </button>
          </div>
        </div>

      </div>

      {/* Step-Up Auth Modal */}
      {showStepUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">High-Risk Action</h3>
            <p className="text-sm text-slate-400 mb-6">
              Initiating a wire transfer requires Step-Up Authentication to verify your identity.
            </p>
            
            {stepUpStatus === 'idle' && (
              <button 
                onClick={handleStepUp}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
                <span>Verify with Biometrics</span>
              </button>
            )}

            {stepUpStatus === 'loading' && (
              <div className="py-2 flex justify-center text-blue-500">
                <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            {stepUpStatus === 'success' && (
              <div className="py-2 text-green-400 font-medium flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Identity Verified!
              </div>
            )}

            <button 
              onClick={() => setShowStepUp(false)}
              disabled={stepUpStatus === 'loading' || stepUpStatus === 'success'}
              className="mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Cancel Transfer
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
