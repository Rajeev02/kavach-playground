'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '../lib/api';

interface DashboardStats {
  devices: any[];
  riskDistribution: { low: number; medium: number; high: number };
  recentEvents: any[];
}

export const SecurityDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAPI('/api/dashboard/stats');
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading dashboard...</div>;
  
  if (error) return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Security Dashboard</h2>
      <div className="p-4 bg-slate-800/50 text-slate-400 rounded-lg text-center border border-dashed border-slate-700">
        <p className="mb-2 text-xl">🔒</p>
        <p>Please log in using the API Key button to view live security data.</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Security Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Devices */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-white">Active Devices</h3>
          <div className="space-y-4">
            {stats?.devices.map((device, i) => (
              <div key={device.id || i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center text-blue-400">
                    💻
                  </div>
                  <div>
                    <p className="font-medium text-sm text-slate-200">{device.userAgent.split(' ')[0] || 'Unknown Device'}</p>
                    <p className="text-xs text-slate-400">IP: {device.ipAddress} • Trsut Score: {device.trustScore}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 text-xs font-medium rounded-full ${device.trustScore >= 80 ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                  {device.trustScore >= 80 ? 'Trusted' : 'Warning'}
                </div>
              </div>
            ))}
            {!stats?.devices.length && <p className="text-sm text-slate-500 text-center py-4">No active devices</p>}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-white">Risk Distribution</h3>
          <div className="flex flex-col space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-400 font-medium">Low Risk</span>
                <span className="text-slate-400">{stats?.riskDistribution.low || 0}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats?.riskDistribution.low || 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-yellow-400 font-medium">Medium Risk</span>
                <span className="text-slate-400">{stats?.riskDistribution.medium || 0}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${stats?.riskDistribution.medium || 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-400 font-medium">High Risk</span>
                <span className="text-slate-400">{stats?.riskDistribution.high || 0}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${stats?.riskDistribution.high || 0}%` }}></div>
              </div>
            </div>
          </div>
          
          {stats?.recentEvents && stats.recentEvents.length > 0 && (
            <div className="mt-6 p-4 bg-red-900/20 rounded-lg border border-red-900/50">
              <h4 className="text-sm font-semibold text-red-400 mb-1">Recent High Risk Event</h4>
              <p className="text-xs text-red-300">{stats.recentEvents[0].eventType} detected from {stats.recentEvents[0].ipAddress}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
