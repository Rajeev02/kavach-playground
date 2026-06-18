import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const initSDK = async (req: Request, res: Response) => {
  try {
    const { workspaceId, apiKey, platform, metadata } = req.body;
    
    // In our simplified demo, apiKey IS the workspaceId.
    // Ensure the workspace exists.
    const workspace = await prisma.workspace.findUnique({
      where: { id: apiKey || workspaceId }
    });

    if (!workspace) {
      return res.status(401).json({ error: 'Invalid API Key / Workspace ID' });
    }

    // For the demo, we will attach the new device to the admin user of this workspace
    // since the Device schema requires a userId.
    const adminUser = await prisma.user.findFirst({
      where: { workspaceId: workspace.id, role: 'admin' }
    });

    if (!adminUser) {
      return res.status(500).json({ error: 'No admin user found for this workspace' });
    }

    // Generate a secure fingerprint
    const fingerprint = `fp_${crypto.randomBytes(16).toString('hex')}`;
    const userAgent = req.headers['user-agent'] || metadata?.userAgent || 'Unknown Browser';
    const ipAddress = req.ip || metadata?.ipAddress || '127.0.0.1';

    // 1. Create the Device
    const device = await prisma.device.create({
      data: {
        workspaceId: workspace.id,
        userId: adminUser.id,
        fingerprint,
        platform: platform || 'Web',
        isTrusted: true,
        trustScore: 99
      }
    });

    // 2. Create an initial Session linking to the device
    await prisma.session.create({
      data: {
        workspaceId: workspace.id,
        userId: adminUser.id,
        deviceId: device.id,
        ipAddress,
        userAgent,
        riskScore: 0,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    });

    return res.status(200).json({
      success: true,
      deviceId: device.id,
      fingerprint: device.fingerprint,
      trustScore: device.trustScore,
      isTrusted: device.isTrusted,
      message: 'Kavach SDK initialized successfully'
    });

  } catch (error: any) {
    console.error('SDK Init Error:', error);
    return res.status(500).json({ error: 'Failed to initialize SDK', details: error.message });
  }
};

export const verifySDK = async (req: Request, res: Response) => {
  try {
    const { fingerprint } = req.body;
    
    if (!fingerprint) {
      return res.status(400).json({ error: 'Fingerprint is required' });
    }

    const device = await prisma.device.findFirst({
      where: { fingerprint }
    });

    if (!device) {
      return res.status(404).json({ error: 'Device not found or not trusted' });
    }

    return res.status(200).json({
      success: true,
      verified: true,
      device: {
        id: device.id,
        isTrusted: device.isTrusted,
        trustScore: device.trustScore
      }
    });

  } catch (error: any) {
    console.error('SDK Verify Error:', error);
    return res.status(500).json({ error: 'Failed to verify SDK', details: error.message });
  }
};
