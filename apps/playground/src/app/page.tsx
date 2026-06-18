import { DemoBanner } from '../components/DemoBanner';
import { SDKTabs } from '../components/SDKTabs';
import { SecurityDashboard } from '../components/SecurityDashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <DemoBanner />
      
      <main className="flex-1 w-full max-w-6xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Kavach Developer Playground
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore and integrate Kavach SDKs across your stack. Monitor security events, manage active devices, and view risk distribution in real-time.
          </p>
        </div>

        <SDKTabs />
        
        <div className="mt-16">
          <SecurityDashboard />
        </div>
      </main>
    </div>
  );
}
