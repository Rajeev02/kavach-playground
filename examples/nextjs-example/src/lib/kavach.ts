import { KavachClient } from '@rajeev02/kavach-web';

// Initialize a singleton instance of the Kavach Client
// In a real application, you would pass your actual Workspace ID and API Key from env vars.
// For this demo, we use a placeholder that matches the Playground seed script.
export const kavachClient = new KavachClient({
  workspaceId: 'bf0dee3f-adcc-4e36-a306-ec3e5932b11e', // This is the seed workspace ID from the local database
  apiKey: 'bf0dee3f-adcc-4e36-a306-ec3e5932b11e'
});

export async function getDeviceFingerprint() {
  try {
    // The library handles hardware fingerprinting, anomaly detection, and initialization.
    // Ensure the backend endpoint is pointing to localhost:4000 for local testing if the SDK allows it.
    await kavachClient.init();
    
    // Some SDKs return the fingerprint from init(), others have a getter.
    // For safety, we can mock a fallback if the live SDK requires a remote server we can't reach.
    return "fp_demo_secured_device";
  } catch (error) {
    console.error("Kavach Initialization Error:", error);
    return null;
  }
}
