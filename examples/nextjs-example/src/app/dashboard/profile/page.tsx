'use client';

import { useState, useEffect } from 'react';

type Profile = {
  email: string;
  role: string;
  createdAt: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const email = localStorage.getItem('kavach_email');
    if (email) {
      fetch(`http://localhost:4000/api/example-app/profile?email=${email}`)
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(console.error);
    } else {
      // Fallback if they haven't re-logged in since the update
      setProfile({
        email: 'admin@demo.com',
        role: 'admin',
        createdAt: new Date().toISOString()
      });
    }
  }, []);

  if (!profile) return <div className="p-8 text-slate-500 dark:text-slate-400">Loading profile securely...</div>;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Profile</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your identity and authentication methods.</p>
        </header>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="px-8 pb-8">
            <div className="flex justify-between items-end -mt-12 mb-4 relative z-10">
              <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center text-3xl font-bold text-slate-900 dark:text-white">
                {profile.email.substring(0, 2).toUpperCase()}
              </div>
              <button 
                onClick={() => showToast('Profile update functionality coming soon.')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none mb-1"
              >
                Edit Profile
              </button>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{profile.email}</h2>
              <div className="flex items-center space-x-3 mt-2">
                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider rounded-lg border border-blue-200 dark:border-blue-500/20">
                  {profile.role.toUpperCase()}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Member since {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Methods */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Authentication Methods</h3>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center border border-green-100 dark:border-green-500/20">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>Password</span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 uppercase tracking-wider font-bold">
                      Primary
                    </span>
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Last changed 3 months ago</p>
                </div>
              </div>
              <button 
                onClick={() => showToast('Password change email sent.')}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
              >
                Change
              </button>
            </div>
            
            <div className="p-6 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Passkey (WebAuthn)</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">MacBook Pro Touch ID</p>
                </div>
              </div>
              <button 
                onClick={() => showToast('Passkey removed successfully.')}
                className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 hover:bg-red-100 dark:hover:bg-red-400/20 rounded-lg transition-colors border border-red-200 dark:border-red-500/20"
              >
                Remove
              </button>
            </div>
            
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => showToast('Opening WebAuthn prompt...')}
                className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all font-medium flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add new method</span>
              </button>
            </div>
          </div>
        </div>

      </div>
      
      {/* Toast Notification overlay */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl border border-slate-700 dark:border-slate-700 flex items-center space-x-3 animate-bounce">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
