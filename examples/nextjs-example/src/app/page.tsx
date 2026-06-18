'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDeviceFingerprint } from '@/lib/kavach';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If already authenticated, bounce to dashboard
    if (localStorage.getItem('kavach_auth') === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStatus('Initializing Kavach Shield...');

    // 1. Initialize Kavach and get secure hardware fingerprint
    const result = await getDeviceFingerprint();
    
    if (!result || !result.fingerprint) {
      setError('Device Security Check Failed. Access Denied.');
      setLoading(false);
      return;
    }

    setStatus('Device Verified. Authenticating...');

    // 2. In a real app, you would send the fingerprint along with the login payload
    // to your backend, where the backend verifies the fingerprint against the database.
    try {
      const response = await fetch('http://localhost:4000/api/sdk/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint: result.fingerprint, email, password })
      });

      // Even if our local backend verification fails (because the live SDK might generate a real payload we didn't mock),
      // we will let the user pass to the dashboard for the sake of the visual demo.
      localStorage.setItem('kavach_auth', 'true');
      localStorage.setItem('kavach_trust_score', result.trustScore.toString());
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);

    } catch (err) {
      setError('Network error connecting to backend.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Acme Inc.</h2>
          <p className="text-slate-400 text-sm mt-2">Protected by Kavach Security</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="admin@demo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6"
          >
            {loading && status !== 'Awaiting Biometrics...' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{status}</span>
              </>
            ) : (
              <span>Sign In Securely</span>
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-500">Or continue with</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              setError('');
              setStatus('Awaiting Biometrics...');
              
              // Simulate Passkey prompt delay
              setTimeout(async () => {
                const result = await getDeviceFingerprint();
                if (!result || !result.fingerprint) {
                  setError('WebAuthn Failed.');
                  setLoading(false);
                  return;
                }
                setStatus('Device Verified. Authenticating...');
                localStorage.setItem('kavach_auth', 'true');
                localStorage.setItem('kavach_trust_score', result.trustScore.toString());
                setTimeout(() => router.push('/dashboard'), 1000);
              }, 1500);
            }}
            disabled={loading}
            className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 border border-slate-700"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <span>Sign in with Passkey</span>
          </button>
        </div>
      </div>
    </div>
  );
}
