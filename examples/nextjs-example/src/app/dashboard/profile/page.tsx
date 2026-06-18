'use client';

export default function ProfilePage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your identity and authentication methods.</p>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex">
          <div className="p-8 border-r border-slate-800 flex flex-col items-center justify-center min-w-[250px] bg-slate-900/50">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-blue-500/20">
              AD
            </div>
            <h2 className="font-bold text-xl">Admin User</h2>
            <p className="text-sm text-slate-400">admin@demo.com</p>
            <div className="mt-4 bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-wider font-bold">
              Organization Admin
            </div>
          </div>
          
          <div className="flex-1 p-8 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="text-slate-200">Admin User</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="text-slate-200">admin@demo.com</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Timezone</label>
                  <div className="text-slate-200">America/Los_Angeles (PST)</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Language</label>
                  <div className="text-slate-200">English (US)</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2 flex justify-between items-center">
                <span>Authentication Methods</span>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">Add Method</button>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Password</div>
                      <div className="text-xs text-slate-500">Updated 3 months ago</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors">Change</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium flex items-center space-x-2">
                        <span>MacBook TouchID</span>
                        <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20 uppercase tracking-wider font-bold">Primary</span>
                      </div>
                      <div className="text-xs text-slate-500">Registered today via Kavach WebAuthn</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-red-400 hover:bg-red-400/10 rounded-lg text-sm transition-colors">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
