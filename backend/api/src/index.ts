import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import our middleware, controllers, and cron jobs
import { globalLimiter, authLimiter } from './middleware/rateLimiter';
import { authenticateToken } from './middleware/auth';
import { login, verifyOTP } from './controllers/auth';
import { getDashboardStats } from './controllers/dashboard';
import { initSDK, verifySDK } from './controllers/sdk';
import { getProfile, getSessions, revokeSession, transferFunds } from './controllers/exampleApp';
import './cron/cleanup';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Apply global rate limiting
app.use(globalLimiter);

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Swagger API Documentation Options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kavach API',
      version: '1.0.0',
      description: 'API Documentation for the Kavach Playground Sandbox Backend',
    },
    servers: [
      {
        url: 'https://kavach-playground-api.vercel.app',
        description: 'Vercel Deployment Server',
      },
      {
        url: 'https://api.demo.kavachid.com',
        description: 'Production Demo Server',
      },
      {
        url: 'http://localhost:4000',
        description: 'Local Development Server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
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
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'developer@kavachid.com' }
                  }
                }
              }
            }
          },
          responses: { 
            200: { description: 'OTP sent' },
            401: { description: 'User not found' }
          }
        }
      },
      '/api/auth/verify': {
        post: {
          summary: 'Verify OTP code',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'developer@kavachid.com' },
                    code: { type: 'string', example: '123456' }
                  }
                }
              }
            }
          },
          responses: { 
            200: { description: 'Returns JWT token' },
            401: { description: 'Invalid or expired OTP' }
          }
        }
      },
      '/api/dashboard/stats': {
        get: {
          summary: 'Get Security Dashboard statistics',
          security: [{ bearerAuth: [] }],
          responses: { 
            200: { description: 'Dashboard stats object' },
            401: { description: 'Unauthorized' }
          }
        }
      }
    }
  },
  apis: [], // Paths are defined directly above
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
const JS_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui-bundle.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui-standalone-preset.min.js"
];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCssUrl: CSS_URL,
  customJs: JS_URLS,
  customSiteTitle: "Kavach API Documentation"
}));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Healthcheck with Database Connection Test
app.get('/health', async (req, res) => {
  try {
    // Attempt a simple database query to verify connectivity
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected', timestamp: new Date() });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected', 
      errorMessage: error.message,
      env: process.env.DATABASE_URL ? 'set' : 'missing'
    });
  }
});

// Auth Routes (with stricter rate limit)
app.post('/api/auth/login', authLimiter, login);
app.post('/api/auth/verify', authLimiter, verifyOTP);

// SDK Integration Routes
app.post('/api/sdk/init', initSDK);
app.post('/api/sdk/verify', verifySDK);

// Protected Dashboard Routes
app.get('/api/dashboard/stats', authenticateToken, getDashboardStats);

// Next.js Example App End-to-End Routes
app.get('/api/example-app/profile', getProfile);
app.get('/api/example-app/sessions', getSessions);
app.delete('/api/example-app/sessions/:id', revokeSession);
app.post('/api/example-app/transfer', transferFunds);

// Start server (Only if not running in a serverless environment like Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Backend API running on http://localhost:${port}`);
  });
}

export default app;
