import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_demo';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { workspace: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Since this is a passwordless OTP flow, we don't check the password here.
    // The user will be authenticated when they verify the OTP code.

    // Generate OTP
    const isDemoMode = process.env.DEMO_MODE === 'true';
    const otpCode = isDemoMode ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    await prisma.oTP.create({
      data: {
        workspaceId: user.workspaceId,
        userId: user.id,
        code: otpCode,
        expiresAt,
      }
    });

    return res.json({ message: 'OTP sent successfully', isDemoMode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otp = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        code,
        expiresAt: {
          gt: new Date()
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!otp) {
      return res.status(401).json({ error: 'Invalid or expired OTP' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, workspaceId: user.workspaceId, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    
    const session = await prisma.session.create({
      data: {
        workspaceId: user.workspaceId,
        userId: user.id,
        ipAddress: req.ip || '0.0.0.0',
        userAgent: req.headers['user-agent'] || 'Unknown',
        expiresAt
      }
    });

    // Delete used OTP
    await prisma.oTP.delete({ where: { id: otp.id } });

    res.json({ token, session: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
