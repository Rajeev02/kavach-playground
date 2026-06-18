import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import our middleware and cron jobs
import { globalLimiter, authLimiter } from './middleware/rateLimiter';
import { login, verifyOTP } from './controllers/auth';
import './cron/cleanup'; // This imports and registers the cron job

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Apply global rate limiting
app.use(globalLimiter);

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Auth Routes (with stricter rate limit)
app.post('/api/auth/login', authLimiter, login);
app.post('/api/auth/verify', authLimiter, verifyOTP);

// Start server (Only if not running in a serverless environment like Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Backend API running on http://localhost:${port}`);
  });
}

export default app;
