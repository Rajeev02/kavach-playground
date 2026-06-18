'use client';

import { useState, useEffect } from 'react';
import { getUser, User } from '../lib/auth';

const tabs = ['Web', 'React Native', 'iOS', 'Android', 'Python', 'Go', 'Flutter'];

export const SDKTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const workspaceId = user?.workspaceId || 'YOUR_WORKSPACE_ID';
  const apiKey = user?.workspaceId || 'YOUR_API_KEY';

  const registryLinks: Record<string, string> = {
    'Web': 'https://www.npmjs.com/package/@rajeev02/kavach-web',
    'React Native': 'https://www.npmjs.com/package/@rajeev02/kavach-react-native',
    'iOS': 'https://cocoapods.org/pods/KavachSDK',
    'Android': 'https://repo1.maven.org/maven2/io/github/rajeev02/kavach/kavach-android/1.0.4/',
    'Python': 'https://pypi.org/project/rajeev02-kavach-sdk/',
    'Go': 'https://pkg.go.dev/github.com/rajeev02/kavach-go',
    'Flutter': 'https://pub.dev/packages/kavach_flutter'
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex space-x-1 rounded-xl bg-slate-900 p-1 border border-slate-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors flex-1
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
        <div className="space-y-6">
          {activeTab === 'Web' && (
            <>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">1. Install the SDK</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre><code>npm install @rajeev02/kavach-web</code></pre>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">2. Initialize on your Client</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre>
                    <code>
{`import { KavachClient } from '@rajeev02/kavach-web';

const kavach = new KavachClient({
  serverUrl: 'https://api.demo.kavachid.com',
  tenantId: '${workspaceId}'
});

// Use kavach to authenticate or fetch data`}
                    </code>
                  </pre>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Python' && (
            <>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">1. Install the SDK</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre><code>pip install rajeev02-kavach-sdk</code></pre>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">2. Initialize on your Backend</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
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
                </div>
              </div>
            </>
          )}

          {activeTab === 'React Native' && (
            <>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">1. Install the SDK</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre><code>npm install @rajeev02/kavach-react-native</code></pre>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">2. Initialize in your App</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre>
                    <code>
{`import Kavach from '@rajeev02/kavach-react-native';

const kavach = new Kavach({
  workspaceId: '${workspaceId}',
  apiKey: '${apiKey}'
});

await kavach.init();`}
                    </code>
                  </pre>
                </div>
              </div>
            </>
          )}

          {activeTab === 'iOS' && (
            <>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">1. Install via CocoaPods</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre><code>pod 'KavachSDK'</code></pre>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">2. Initialize in AppDelegate</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
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
                </div>
              </div>
            </>
          )}

          {activeTab === 'Android' && (
            <>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">1. Add Maven Dependency</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre><code>implementation 'io.github.rajeev02:kavach:1.0.0'</code></pre>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">2. Initialize in MainActivity</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre>
                    <code>
{`import io.github.rajeev02.kavach.KavachClient

val kavach = KavachClient.Builder(context)
    .setWorkspaceId("${workspaceId}")
    .setApiKey("${apiKey}")
    .build()

kavach.initialize()`}
                    </code>
                  </pre>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Go' && (
            <>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">1. Get the Go Module</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre><code>go get github.com/rajeev02/kavach-go</code></pre>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">2. Initialize Client Middleware</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
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
                </div>
              </div>
            </>
          )}

          {activeTab === 'Flutter' && (
            <>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">1. Add Pub Dependency</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre><code>flutter pub add kavach_flutter</code></pre>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">2. Initialize in main.dart</h4>
                <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                  <pre>
                    <code>
{`import 'package:kavach_flutter/kavach_flutter.dart';

final kavach = KavachClient(
  workspaceId: '${workspaceId}',
  apiKey: '${apiKey}',
);

await kavach.initialize();`}
                    </code>
                  </pre>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
          <a 
            href={registryLinks[activeTab]}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-400 hover:text-white flex items-center transition-colors"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View on Registry
          </a>
          <a 
            href={`https://github.com/Rajeev02/kavach-playground/tree/main/examples/${activeTab.toLowerCase().replace(' ', '-')}-example`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center transition-colors"
          >
            View Full {activeTab} Example App &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
