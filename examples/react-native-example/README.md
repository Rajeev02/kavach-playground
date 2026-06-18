# Kavach SDK - React Native Integration

This directory contains a skeleton integration of the Kavach React Native SDK. It demonstrates how to initialize the Kavach client, fetch a secure device fingerprint, and protect your mobile application.

## Prerequisites

- Node.js
- React Native CLI or Expo
- A Kavach API Key (Get one from the Playground)

## Setup

1. Install the SDK:
```bash
npm install @kavach/react-native
```

2. Link dependencies (if using bare React Native):
```bash
cd ios && pod install
```

3. Initialize the SDK in your main `App.tsx`. See the `App.tsx` file in this directory for a complete example.

## Usage

Once initialized, Kavach automatically monitors device posture and generates a secure device fingerprint that can be sent to your backend for authentication.
