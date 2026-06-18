'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <span>Acme Internal</span>
              <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/20 uppercase tracking-wider font-semibold">
                Protected Route
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Your device was securely fingerprinted by Kavach.</p>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold">Zero-Trust Access</h3>
            <p className="text-sm text-slate-400">Device verified prior to authentication.</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold">Device Trust</h3>
            <p className="text-sm text-slate-400">Trust score evaluated successfully.</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold">Anomaly Detection</h3>
            <p className="text-sm text-slate-400">Continuous monitoring enabled.</p>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-4">Secure Information</h2>
          <div className="p-4 bg-slate-950 rounded-lg font-mono text-sm text-slate-300 border border-slate-800">
            <p className="mb-2 text-green-400">// This data is only accessible to trusted devices</p>
            <p>{`{`}</p>
            <p className="pl-4">"customerData": "Accessible",</p>
            <p className="pl-4">"financialRecords": "Verified",</p>
            <p className="pl-4">"kavachShieldStatus": "Active"</p>
            <p>{`}`}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
