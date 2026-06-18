'use client';

import { useState } from 'react';
import { LoginModal } from './LoginModal';

export const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">K</div>
          <span className="font-bold text-xl tracking-tight">Kavach<span className="text-blue-400">Playground</span></span>
        </div>
        <nav className="flex items-center space-x-6 text-sm text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Main Website</a>
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Login / Get API Key
          </button>
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
