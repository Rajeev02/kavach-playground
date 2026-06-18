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
          <a href="https://github.com/Rajeev02/kavachid" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="https://github.com/Rajeev02/kavach-playground/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a>
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
