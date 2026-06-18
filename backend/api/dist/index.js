"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
// Import our middleware and cron jobs
const rateLimiter_1 = require("./middleware/rateLimiter");
const auth_1 = require("./controllers/auth");
require("./cron/cleanup"); // This imports and registers the cron job
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Apply global rate limiting
app.use(rateLimiter_1.globalLimiter);
// Healthcheck
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
// Auth Routes (with stricter rate limit)
app.post('/api/auth/login', rateLimiter_1.authLimiter, auth_1.login);
app.post('/api/auth/verify', rateLimiter_1.authLimiter, auth_1.verifyOTP);
// Start server
app.listen(port, () => {
    console.log(`Backend API running on http://localhost:${port}`);
});
