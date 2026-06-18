'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [toast, setToast] = useState('');

  const handleSave = () => {
    setToast('Preferences saved securely.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="p-8 relative min-h-screen">
      {toast && (
        <div className="absolute top-4 right-8 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
          {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Preferences</h1>
          <p className="text-slate-400 text-sm mt-1">Configure your application settings and notifications.</p>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800">
          
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Dark Mode</h3>
              <p className="text-sm text-slate-400 mt-1">Toggle between light and dark themes.</p>
            </div>
            <div 
              onClick={() => {
                setDarkMode(!darkMode);
                setToast('Theme changes will apply on next reload.');
                setTimeout(() => setToast(''), 3000);
              }}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${darkMode ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Security Alerts</h3>
              <p className="text-sm text-slate-400 mt-1">Receive email notifications for new logins or anomalous behavior.</p>
            </div>
            <div 
              onClick={() => setAlerts(!alerts)}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${alerts ? 'bg-blue-600' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${alerts ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Developer Mode</h3>
              <p className="text-sm text-slate-400 mt-1">Show detailed Kavach SDK logs and metadata in the browser console.</p>
            </div>
            <div 
              onClick={() => setDevMode(!devMode)}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${devMode ? 'bg-blue-600' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${devMode ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>

        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
