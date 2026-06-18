# Kavach Next.js Example App

This is a complete, end-to-end full-stack application demonstrating how to integrate the actual published `@rajeev02/kavach-web` SDK into a modern Next.js 15 application.

## How it works

1. The `src/lib/kavach.ts` file initializes the live SDK using your actual workspace configuration.
2. The Login Page (`src/app/page.tsx`) calls `getDeviceFingerprint()` to securely interrogate the device hardware and risk profile *before* allowing the user to authenticate.
3. The Next.js frontend sends this secure fingerprint to the Kavach Backend API (`/api/sdk/verify`) to ensure the device is trusted.
4. Only trusted devices are allowed into the secure `/dashboard`.

## Running the Demo

To run this demo end-to-end, you need to be running the `kavach-playground` backend API concurrently.

1. **Start the Backend API:**
   Ensure you are in the root of the playground repository.
   ```bash
   cd ../../backend/api
   npm run dev
   ```
   *The backend must be running on port 4000.*

2. **Start this Next.js Example:**
   ```bash
   npm run dev
   ```
   *The example app will start on port 3001 (or 3000).*

3. **Test the Integration:**
   Open `http://localhost:3000`, type in any test credentials, and click **Sign In Securely**. The app will fingerprint your browser, verify it against the backend, and admit you to the secure dashboard.

4. **Watch the Dashboard Update:**
   Open the main Kavach Playground frontend, log in as `admin@demo.com`, and look at the Security Dashboard. You will see your local Next.js instance actively feeding telemetry to the Live Active Devices map!
