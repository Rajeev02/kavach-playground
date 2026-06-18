import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import './cron'; // Initialize Cron Jobs

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Strict Rate Limiting (100 requests per hour per IP)
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after an hour' },
});

app.use('/api/', apiLimiter);

// Middleware for Workspace Isolation
app.use(async (req, res, next) => {
  // Mock Workspace resolution for Sandbox mode
  const apiKey = req.headers['x-api-key'];
  if (apiKey) {
    req.workspaceId = apiKey as string; // Simplification for sandbox
  } else {
    // Default to the global demo workspace
    const demoWorkspace = await prisma.workspace.findFirst({ where: { isSandbox: false } });
    if (demoWorkspace) {
      req.workspaceId = demoWorkspace.id;
    }
  }
  next();
});

// Demo OTP Endpoint
app.post('/api/auth/otp/request', async (req, res) => {
  const { email } = req.body;
  
  if (process.env.DEMO_MODE === 'true') {
    // No external SMS/Email provider in Demo Mode
    const otpCode = '123456';
    
    const user = await prisma.user.findFirst({
      where: { email, workspaceId: req.workspaceId }
    });

    if (user) {
      await prisma.oTP.create({
        data: {
          userId: user.id,
          workspaceId: req.workspaceId,
          code: otpCode,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 mins
        }
      });
      return res.json({ message: 'OTP sent! (Use 123456 in DEMO_MODE)' });
    }
  }
  
  return res.status(400).json({ error: 'User not found or Demo Mode disabled' });
});

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', demoMode: process.env.DEMO_MODE });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Sandbox API running on port ${PORT}`);
  console.log(`🔒 DEMO_MODE: ${process.env.DEMO_MODE}`);
});
