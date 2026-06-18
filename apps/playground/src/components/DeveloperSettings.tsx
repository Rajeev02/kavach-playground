'use client';

import { useState, useEffect } from 'react';
import { getUser, User } from '../lib/auth';

export const DeveloperSettings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  if (!user) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(user.workspaceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-12">
      <h2 className="text-2xl font-bold mb-4">Developer Settings</h2>
      
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-2 text-white">Your Live API Key</h3>
        <p className="text-sm text-slate-400 mb-4">
          Use this key to initialize the Kavach SDK in your application. Keep it secure and do not expose it in client-side code.
        </p>
        
        <div className="flex items-center space-x-4">
          <code className="bg-slate-950 px-4 py-3 rounded-lg border border-slate-800 text-green-400 font-mono text-sm flex-1">
            {user.workspaceId}
          </code>
          <button 
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-32 text-center"
          >
            {copied ? 'Copied!' : 'Copy Key'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-white">Quick Start Integration</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">1. Install the SDK</h4>
            <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-slate-300 font-mono text-sm overflow-x-auto">
              <code>npm install @kavach/node @kavach/react</code>
            </pre>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">2. Initialize on your Backend</h4>
            <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-slate-300 font-mono text-sm overflow-x-auto">
              <code>
{`import { KavachNode } from '@kavach/node';

const kavach = new KavachNode({
  apiKey: '${user.workspaceId}'
});

// Protect a route
app.post('/api/login', kavach.protect(), (req, res) => {
  res.json({ success: true });
});`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
