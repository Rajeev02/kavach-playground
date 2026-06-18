'use client';

import { useState, useEffect } from 'react';
import { getUser, User } from '../lib/auth';

const tabs = ['Web', 'React Native', 'iOS', 'Android', 'Python', 'Go'];

export const SDKTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const workspaceId = user?.workspaceId || 'YOUR_WORKSPACE_ID';
  const apiKey = user?.workspaceId || 'YOUR_API_KEY';

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex space-x-1 rounded-xl bg-slate-900 p-1 border border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
              ${activeTab === tab
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-white">{activeTab} SDK Integration</h3>
        <p className="text-slate-400 mb-4">Select an environment to view the code snippet.</p>
        <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
          {activeTab === 'Web' && (
            <pre>
              <code>
{`import { Kavach } from '@kavach/web';

const kavach = new Kavach({
  workspaceId: '${workspaceId}',
  apiKey: '${apiKey}'
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
    workspace_id="${workspaceId}",
    api_key="${apiKey}"
)

client.init()`}
              </code>
            </pre>
          )}
          {activeTab === 'React Native' && (
            <pre>
              <code>
{`import Kavach from '@kavach/react-native';

const kavach = new Kavach({
  workspaceId: '${workspaceId}',
  apiKey: '${apiKey}'
});

await kavach.init();`}
              </code>
            </pre>
          )}
          {activeTab === 'iOS' && (
            <pre>
              <code>
{`import KavachSDK

let kavach = KavachClient(
    workspaceId: "${workspaceId}",
    apiKey: "${apiKey}"
)

kavach.initialize()`}
              </code>
            </pre>
          )}
          {activeTab === 'Android' && (
            <pre>
              <code>
{`import com.kavach.sdk.KavachClient

val kavach = KavachClient.Builder(context)
    .setWorkspaceId("${workspaceId}")
    .setApiKey("${apiKey}")
    .build()

kavach.initialize()`}
              </code>
            </pre>
          )}
          {activeTab === 'Go' && (
            <pre>
              <code>
{`import "github.com/rajeev02/kavach-go"

client := kavach.NewClient(kavach.Config{
    WorkspaceID: "${workspaceId}",
    APIKey:      "${apiKey}",
})

err := client.Initialize()`}
              </code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
