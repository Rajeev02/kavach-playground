'use client';

export default function SettingsPage() {
  return (
    <div className="p-8">
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
            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Security Alerts</h3>
              <p className="text-sm text-slate-400 mt-1">Receive email notifications for new logins or anomalous behavior.</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Developer Mode</h3>
              <p className="text-sm text-slate-400 mt-1">Show detailed Kavach SDK logs and metadata in the browser console.</p>
            </div>
            <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
            </div>
          </div>

        </div>
        
        <div className="flex justify-end">
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
