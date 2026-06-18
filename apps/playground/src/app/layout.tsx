import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/Header';

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
        
        <Header />

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
