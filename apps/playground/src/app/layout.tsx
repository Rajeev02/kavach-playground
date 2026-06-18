import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kavach Playground | Interactive Developer Demo',
  description: 'Test live Kavach SDK integrations directly in your browser. Anonymous demo environments delete data after 7 days.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen flex flex-col`}>
        {/* GLOBAL DEMO BANNER */}
        <div className="bg-yellow-500/20 border-b border-yellow-500/50 px-4 py-2 text-center text-yellow-200 text-sm font-medium">
          ⚠️ <span className="font-bold">Demo Environment:</span> All data is temporary and automatically deleted after 7 days. This environment is intended for testing and evaluation purposes only.
        </div>
        
        {/* HEADER */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">K</div>
            <span className="font-bold text-xl tracking-tight">Kavach<span className="text-blue-400">Playground</span></span>
          </div>
          <nav className="flex items-center space-x-6 text-sm text-slate-300">
            <a href="https://docs.kavachid.com" className="hover:text-white transition-colors">Documentation</a>
            <a href="https://kavachid.com" className="hover:text-white transition-colors">Main Website</a>
            <button className="bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">
              Get API Key
            </button>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
