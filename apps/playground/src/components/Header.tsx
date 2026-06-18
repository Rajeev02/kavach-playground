'use client';

import { useState, useEffect } from 'react';
import { LoginModal } from './LoginModal';
import { getUser, logout, User } from '../lib/auth';

export const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">K</div>
          <span className="font-bold text-xl tracking-tight">Kavach<span className="text-blue-400">Playground</span></span>
        </div>
        <nav className="flex items-center space-x-6 text-sm text-slate-300">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex flex-col text-right">
                <span className="text-white font-medium capitalize">{user.role} Account</span>
                <span className="text-xs text-slate-400 font-mono">Workspace: {user.workspaceId.split('-')[0]}...</span>
              </div>
              <button 
                onClick={logout}
                className="bg-slate-800 text-slate-300 px-4 py-1.5 rounded-full font-medium hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Login / Get API Key
            </button>
          )}
        </nav>
      </header>
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={() => window.location.reload()} 
      />
    </>
  );
};
