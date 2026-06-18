import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const workspaceId = (req as any).workspaceId;

    if (!workspaceId) {
      return res.status(401).json({ error: 'Unauthorized workspace' });
    }

    // 1. Fetch Active Devices
    const devices = await prisma.device.findMany({
      where: { workspaceId },
      orderBy: { lastActive: 'desc' },
      take: 5
    });

    // 2. Calculate Risk Distribution (Mock calculation based on device trust scores for demo)
    const lowRisk = devices.filter(d => d.trustScore >= 80).length;
    const mediumRisk = devices.filter(d => d.trustScore >= 40 && d.trustScore < 80).length;
    const highRisk = devices.filter(d => d.trustScore < 40).length;
    const total = devices.length || 1; // Prevent division by zero

    const riskDistribution = {
      low: Math.round((lowRisk / total) * 100),
      medium: Math.round((mediumRisk / total) * 100),
      high: Math.round((highRisk / total) * 100),
    };

    // 3. Fetch Recent Security Events
    const recentEvents = await prisma.securityEvent.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    res.json({
      devices,
      riskDistribution,
      recentEvents
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};
