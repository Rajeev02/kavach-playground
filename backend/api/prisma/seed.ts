import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs'; // Need to install bcryptjs

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Demo Database...');

  // 1. Create a Global Demo Workspace
  const workspace = await prisma.workspace.create({
    data: {
      id: 'bf0dee3f-adcc-4e36-a306-ec3e5932b11e',
      name: 'Global Demo Environment',
      isSandbox: false,
    },
  });

  const demoPasswordHash = await bcrypt.hash('Demo@123', 10);

  // 2. Create the Demo Users
  const users = [
    { email: 'admin@demo.com', role: 'admin' },
    { email: 'developer@demo.com', role: 'developer' },
    { email: 'user@demo.com', role: 'user' },
    { email: 'developer@kavachid.com', role: 'developer' },
  ];

  for (const u of users) {
    await prisma.user.create({
      data: {
        workspaceId: workspace.id,
        email: u.email,
        password: demoPasswordHash,
        role: u.role,
      },
    });
    console.log(`Created demo user: ${u.email}`);
  }

  console.log('Seeding complete! Workspace ID:', workspace.id);

  // 3. Create mock devices for the dashboard
  const devices = [
    { platform: 'Mac OS', ip: '192.168.1.45', score: 95, browser: 'Chrome on Mac' },
    { platform: 'Windows', ip: '10.0.0.12', score: 65, browser: 'Edge on Windows' },
    { platform: 'iOS', ip: '172.20.10.2', score: 25, browser: 'Safari on iPhone' },
  ];

  // Proper device creation matching schema
  const adminUser = await prisma.user.findFirst({ where: { email: 'admin@demo.com' } });
  if (adminUser) {
    for (const d of devices) {
      // First create a session to mock userAgent and IP
      const session = await prisma.session.create({
        data: {
          workspaceId: workspace.id,
          userId: adminUser.id,
          ipAddress: d.ip,
          userAgent: d.browser,
          riskScore: 100 - d.score,
          expiresAt: new Date(Date.now() + 1000000),
        }
      });

      await prisma.device.create({
        data: {
          workspaceId: workspace.id,
          userId: adminUser.id,
          fingerprint: 'mock-fp-' + Math.random(),
          platform: d.platform,
          isTrusted: d.score >= 80,
          trustScore: d.score,
        }
      });
    }

    // 4. Create mock Security Events
    await prisma.securityEvent.create({
      data: {
        workspaceId: workspace.id,
        type: 'ANOMALOUS_IP',
        description: 'Login attempt from unrecognized IP address detected.',
      }
    });

    await prisma.securityEvent.create({
      data: {
        workspaceId: workspace.id,
        type: 'JAILBREAK_DETECTED',
        description: 'Compromised iOS device signature detected.',
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
