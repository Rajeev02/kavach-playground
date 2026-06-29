# Kavach Playground

A comprehensive security and authentication ecosystem showcasing the Kavach SDKs across web, mobile, and backend environments. 

The playground provides an interactive environment to explore risk distribution, active devices, and API key management in real-time, accompanied by a secure backend API that demonstrates SDK integration patterns.

## Features

- **Passwordless OTP Login** — Implements an email-based authentication flow for user access without passwords.
- **Device Fingerprinting** — Tracks device trust scores and flags untrusted devices attempting to access protected endpoints.
- **Workspace Isolation** — Uses a multi-tenant database schema to separate security events, risk events, and devices by workspace.
- **Dynamic Security Dashboard** — Visualizes real-time metrics including trusted devices, risk scores, and audit logs.
- **Live SDK Snippets** — Injects workspace credentials into dynamically generated code snippets for immediate copy-pasting.

## Architecture

The project is structured as a monorepo containing the playground frontend, backend API, documentation, and SDK example implementations. 

Data flows from the client SDKs (or example apps) to the backend API, where the device fingerprint and token are verified before authorizing sensitive actions (e.g., simulated funds transfer).

### Components

- `apps/playground` — The primary Next.js web application serving the developer dashboard.
- `apps/docs` — A Docusaurus-based documentation site for the SDKs.
- `backend/api` — An Express.js backend managing authentication, workspace data, and SDK verification logic.
- `examples/*` — Reference implementations of the Kavach SDK across multiple platforms (iOS, Android, React Native, Go, Python, etc.).

## Technology Stack

| Category       | Technology |
| -------------- | ---------- |
| Language       | TypeScript |
| Frontend       | Next.js, React, Tailwind CSS |
| Backend        | Express.js, Node.js |
| Database       | PostgreSQL, Prisma ORM |
| Documentation  | Docusaurus, Swagger UI |

## Project Structure

```text
kavach-playground/
├── apps/
│   ├── docs/          # Docusaurus documentation site
│   └── playground/    # Next.js developer dashboard
├── backend/
│   └── api/           # Express.js API and Prisma schema
├── examples/          # Client SDK implementations across platforms
├── infrastructure/    # Deployment and Docker configurations
└── package.json       # Workspace root
```

## Prerequisites

- Node.js (v20+)
- Docker (for local PostgreSQL instance)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/kavach-playground.git
cd kavach-playground
```

2. Install dependencies across all workspaces:

```bash
npm install
```

3. Start the local PostgreSQL database:

```bash
docker compose up -d
```

4. Configure the backend environment:

```bash
cd backend/api
cp .env.example .env
```

Ensure `DATABASE_URL` in `.env` points to the local database: `postgresql://postgres:postgrespassword@localhost:5432/kavach_playground`.

5. Initialize the database schema and seed data:

```bash
npx prisma db push
npm run db:seed
```

6. Configure the frontend environment:

```bash
cd ../../apps/playground
cp .env.example .env.local
```

## Quick Start

From the repository root, start all development servers concurrently using npm workspaces:

```bash
npm run dev
```

- **Playground**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000](http://localhost:4000)
- **API Documentation**: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

## API Reference

The backend exposes a Swagger UI for API exploration. Once the backend is running, visit `/api-docs` to interact with endpoints.

Key routes include:

- `POST /api/auth/login` — Initiates OTP login.
- `POST /api/sdk/init` — Initializes a workspace session.
- `POST /api/sdk/verify` — Validates a device fingerprint.
- `POST /api/example-app/transfer` — A mock protected endpoint that requires a valid session and trusted device.

## Deployment

The stack is configured for deployment on serverless platforms.

- **Frontend**: Deploy `apps/playground` to Vercel. 
- **Backend**: Deploy `backend/api` to Vercel or Railway. Set `DATABASE_URL` and `JWT_SECRET` in the environment variables.
