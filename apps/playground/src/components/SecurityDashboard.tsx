'use client';

export const SecurityDashboard = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Security Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Devices */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Active Devices</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    💻
                  </div>
                  <div>
                    <p className="font-medium text-sm">MacBook Pro - Chrome</p>
                    <p className="text-xs text-gray-500">IP: 192.168.1.{i * 10} • Location: San Francisco</p>
                  </div>
                </div>
                <div className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Trusted
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Risk Distribution</h3>
          <div className="flex flex-col space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-600 font-medium">Low Risk</span>
                <span className="text-gray-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-yellow-600 font-medium">Medium Risk</span>
                <span className="text-gray-600">12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-600 font-medium">High Risk</span>
                <span className="text-gray-600">3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '3%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
            <h4 className="text-sm font-semibold text-red-800 mb-1">Recent High Risk Event</h4>
            <p className="text-xs text-red-600">Login attempt from an anonymous proxy network blocked at 14:32 UTC.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
