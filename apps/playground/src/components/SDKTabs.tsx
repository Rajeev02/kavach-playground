'use client';

import { useState } from 'react';

const tabs = ['Web', 'React Native', 'iOS', 'Android', 'Python', 'Go'];

export const SDKTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 
              ${activeTab === tab
                ? 'bg-white text-blue-700 shadow'
                : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 p-6 bg-white border rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2">{activeTab} SDK Integration</h3>
        <p className="text-gray-600 mb-4">Select an environment to view the code snippet.</p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          {activeTab === 'Web' && (
            <pre>
              <code>
{`import { Kavach } from '@rajeev02/kavach-web';

const kavach = new Kavach({
  workspaceId: 'demo-workspace',
  apiKey: 'demo-key'
});

await kavach.init();`}
              </code>
            </pre>
          )}
          {activeTab === 'Python' && (
            <pre>
              <code>
{`from kavach import KavachClient

client = KavachClient(
    workspace_id="demo-workspace",
    api_key="demo-key"
)

client.init()`}
              </code>
            </pre>
          )}
          {/* Fallback for others */}
          {activeTab !== 'Web' && activeTab !== 'Python' && (
            <pre>
              <code>{`// Snippet for ${activeTab} coming soon...`}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
