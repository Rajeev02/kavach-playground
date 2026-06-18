# Kavach Playground

A comprehensive security and authentication ecosystem showcasing the **Kavach SDKs** across web, mobile, and backend environments. 

This repository contains the interactive Developer Playground and the secure Backend API, allowing developers to explore risk distribution, active devices, and API key management in real-time.

## Features

- **Passwordless OTP Login:** Secure email-based authentication flow.
- **Dynamic Security Dashboard:** Real-time visualization of trusted devices, risk scores, and security events.
- **Live SDK Snippets:** Dynamically generated code snippets injected with your personal workspace credentials for instant copy-pasting.
- **Interactive API Documentation:** Automatically generated Swagger UI.
- **Serverless Ready:** Fully optimized for deployment on Vercel.

## Architecture

This project is a monorepo containing two main packages:

1. `apps/playground`: The Next.js/React frontend dashboard.
2. `backend/api`: The Express.js backend powered by Prisma and PostgreSQL.

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (We recommend Neon for serverless compatibility)

### 1. Backend Setup

```bash
cd backend/api
npm install
```

Copy the environment template and configure your database:
```bash
cp .env.example .env
```

Push the database schema and seed the demo data:
```bash
npx prisma db push
npm run db:seed
```

Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup

In a new terminal:
```bash
cd apps/playground
npm install
```

Copy the environment template and point it to your local backend:
```bash
cp .env.example .env.local
```

Start the frontend development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to view the playground!

## Deployment

This stack is designed to be easily deployed to **Vercel**:
1. Deploy `apps/playground` as a Next.js framework project.
2. Deploy `backend/api` as a Node.js project (Ensure you set your `DATABASE_URL` and `JWT_SECRET` in the Vercel environment variables).

---

Built with ❤️ for the Kavach ecosystem.
