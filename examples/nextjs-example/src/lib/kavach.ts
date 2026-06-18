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
    // Some SDKs return the fingerprint from an init() call, others have a getter or do it silently.
    // For safety, we can mock a fallback if the live SDK requires a remote server we can't reach.
    return "fp_demo_secured_device";
  } catch (error) {
    console.error("Kavach Initialization Error:", error);
    return null;
  }
}
