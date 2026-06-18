'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [alerts, setAlerts] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { setTimeout(() => setMounted(true), 0); }, []);

  const handleSave = () => {
    setToast('Preferences saved securely.');
    setTimeout(() => setToast(''), 3000);
  };


  return (
    <div className="p-8 relative min-h-screen">
      {toast && (
        <div className="absolute top-4 right-8 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
          {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Preferences</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure your application settings and notifications.</p>
        </header>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800 shadow-sm dark:shadow-none">
          
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Toggle between light and dark themes.</p>
            </div>
            {mounted && (
              <div 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${theme === 'dark' ? 'right-1' : 'left-1'}`}></div>
              </div>
            )}
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Security Alerts</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Receive email notifications for new logins or anomalous behavior.</p>
            </div>
            <div 
              onClick={() => setAlerts(!alerts)}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${alerts ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${alerts ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Developer Mode</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Show detailed Kavach SDK logs and metadata in the browser console.</p>
            </div>
            <div 
              onClick={() => setDevMode(!devMode)}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${devMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
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
