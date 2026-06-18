import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { PrismaClient } from '@prisma/client';

// Import our middleware, controllers, and cron jobs
import { globalLimiter, authLimiter } from './middleware/rateLimiter';
import { requireAuth } from './middleware/auth';
import { login, verifyOTP } from './controllers/auth';
import { getDashboardStats } from './controllers/dashboard';
import './cron/cleanup';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Apply global rate limiting
app.use(globalLimiter);

// Swagger API Documentation
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Kavach API',
    version: '1.0.0',
    description: 'API Documentation for the Kavach Playground Backend',
  },
  paths: {
    '/health': {
      get: {
        summary: 'Healthcheck endpoint',
        responses: { 200: { description: 'OK' } }
      }
    },
    '/api/auth/login': {
      post: {
        summary: 'Request OTP login',
        responses: { 200: { description: 'OTP sent' } }
      }
    },
    '/api/dashboard/stats': {
      get: {
        summary: 'Get Security Dashboard statistics',
        responses: { 200: { description: 'Dashboard stats object' } }
      }
    }
  }
};

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Auth Routes (with stricter rate limit)
app.post('/api/auth/login', authLimiter, login);
app.post('/api/auth/verify', authLimiter, verifyOTP);

// Protected Dashboard Routes
app.get('/api/dashboard/stats', requireAuth, getDashboardStats);

// Start server (Only if not running in a serverless environment like Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Backend API running on http://localhost:${port}`);
  });
}

export default app;
