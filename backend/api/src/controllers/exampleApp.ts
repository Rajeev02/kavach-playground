import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const user = await prisma.user.findFirst({
      where: { email: String(email) },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const user = await prisma.user.findFirst({
      where: { email: String(email) }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const sessions = await prisma.session.findMany({
      where: { userId: user.id },
      include: { device: true },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json(sessions);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch sessions', details: error.message });
  }
};

export const revokeSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.session.delete({
      where: { id: String(id) }
    });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to revoke session', details: error.message });
  }
};

export const transferFunds = async (req: Request, res: Response) => {
  try {
    const { fingerprint } = req.body;
    
    // Perform step-up auth validation using Kavach
    if (!fingerprint) {
      return res.status(400).json({ error: 'Fingerprint required for high-risk action' });
    }

    const device = await prisma.device.findFirst({
      where: { fingerprint }
    });

    if (!device || !device.isTrusted || device.trustScore < 80) {
      return res.status(403).json({ error: 'Step-Up Auth Failed. Device untrusted.' });
    }

    // Process the transfer...
    return res.status(200).json({ success: true, message: 'Transfer completed securely.' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Transfer failed', details: error.message });
  }
};
