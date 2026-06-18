'use client';

import { useState, useEffect } from 'react';

type Session = {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('kavach_email');
    if (email) {
      fetch(`http://localhost:4000/api/example-app/sessions?email=${email}`)
        .then(res => res.json())
        .then(data => {
          // Map DB models to UI models
          const mapped = data.map((s: any, idx: number) => ({
            id: s.id,
            device: s.device?.platform || 'Unknown Device',
            browser: s.userAgent || 'Unknown Browser',
            location: s.ipAddress || 'Unknown IP',
            lastActive: new Date(s.createdAt).toLocaleString(),
            isCurrent: idx === 0 // Just map the most recent session as current for demo
          }));
          setSessions(mapped);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const revokeSession = async (id: string) => {
    setRevokingId(id);
    try {
      await fetch(`http://localhost:4000/api/example-app/sessions/${id}`, { method: 'DELETE' });
      setSessions(prev => prev.filter(s => s.id !== id));
    } catch (e) {
      console.error(e);
    }
    setRevokingId(null);
  };

  const handleRevokeAll = async () => {
    const others = sessions.filter(s => !s.isCurrent);
    for (const s of others) {
      await fetch(`http://localhost:4000/api/example-app/sessions/${s.id}`, { method: 'DELETE' });
    }
    setSessions(prev => prev.filter(s => s.isCurrent));
  };

  if (loading) return <div className="p-8 text-slate-400">Loading active sessions securely...</div>;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Security Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your active sessions and connected devices.</p>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <div>
              <h2 className="font-semibold">Active Sessions</h2>
              <p className="text-sm text-slate-400 mt-1">You are currently logged in to {sessions.length} devices.</p>
            </div>
            <button 
              onClick={handleRevokeAll}
              className="px-4 py-2 text-sm font-medium text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors border border-red-500/20"
            >
              Revoke All Other Sessions
            </button>
          </div>
          
          <div className="divide-y divide-slate-800">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 border border-slate-700">
                    {session.device.includes('iPhone') || session.device.includes('iOS') ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center space-x-2">
                      <span>{session.device}</span>
                      {session.isCurrent && (
                        <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20 uppercase tracking-wider font-bold">
                          This Device
                        </span>
                      )}
                    </h3>
                    <div className="text-sm text-slate-400 mt-1 flex items-center space-x-2">
                      <span>{session.browser}</span>
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                      <span>{session.location}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Last active: {session.lastActive}</p>
                  </div>
                </div>
                
                {!session.isCurrent && (
                  <button 
                    onClick={() => revokeSession(session.id)}
                    disabled={revokingId === session.id}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 bg-slate-800 rounded-lg transition-all disabled:opacity-50"
                  >
                    {revokingId === session.id ? 'Revoking...' : 'Revoke'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
