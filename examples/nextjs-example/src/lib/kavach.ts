import { KavachClient } from '@rajeev02/kavach-web';

// Initialize a singleton instance of the Kavach Client
// In a real application, you would pass your actual Tenant ID and Server URL from env vars.
// For this demo, we use a placeholder that matches the Playground seed script.
export const kavachClient = new KavachClient({
  serverUrl: 'http://localhost:4000',
  tenantId: 'bf0dee3f-adcc-4e36-a306-ec3e5932b11e'
});

export async function getDeviceFingerprint() {
  try {
    // In a real production app, the live @rajeev02/kavach-web SDK would automatically 
    // construct the fingerprint and push it to your serverUrl.
    // For this local demo to visually show up on your Dashboard, we will explicitly hit the backend init route.
    
    const response = await fetch('http://localhost:4000/api/sdk/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId: 'bf0dee3f-adcc-4e36-a306-ec3e5932b11e',
        apiKey: 'bf0dee3f-adcc-4e36-a306-ec3e5932b11e',
        platform: 'Next.js Example App',
        metadata: {
          userAgent: navigator.userAgent
        }
      })
    });

    if (!response.ok) {
      console.warn("Backend /api/sdk/init failed. Ensure backend is running on port 4000.");
      return "fp_demo_secured_device";
    }

    const data = await response.json();
    return data.fingerprint;
  } catch (error) {
    console.error("Kavach Initialization Error:", error);
    return "fp_demo_secured_device";
  }
}
