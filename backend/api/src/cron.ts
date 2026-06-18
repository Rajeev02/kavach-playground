import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Run Daily at 2:00 AM
cron.schedule('0 2 * * *', async () => {
  console.log('[CRON] Starting Data Retention Cleanup...');

  try {
    const now = new Date();

    // 1. Delete Expired Users (7 Days)
    const users7DaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const usersRes = await prisma.user.deleteMany({
      where: {
        createdAt: { lt: users7DaysAgo },
        role: { not: 'admin' }, // Preserve demo admins
      },
    });
    console.log(`[CRON] Deleted ${usersRes.count} expired users.`);

    // 2. Delete Expired Devices (7 Days)
    const devicesRes = await prisma.device.deleteMany({
      where: {
        createdAt: { lt: users7DaysAgo },
      },
    });
    console.log(`[CRON] Deleted ${devicesRes.count} expired devices.`);

    // 3. Delete Expired Sessions (24 Hours)
    const sessions24HoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sessionsRes = await prisma.session.deleteMany({
      where: {
        createdAt: { lt: sessions24HoursAgo },
      },
    });
    console.log(`[CRON] Deleted ${sessionsRes.count} expired sessions.`);

    // 4. Delete Expired OTPs (5 Minutes)
    const otp5MinsAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const otpRes = await prisma.oTP.deleteMany({
      where: {
        createdAt: { lt: otp5MinsAgo },
      },
    });
    console.log(`[CRON] Deleted ${otpRes.count} expired OTPs.`);

    // 5. Delete Expired Security Events (7 Days)
    const secEventsRes = await prisma.securityEvent.deleteMany({
      where: {
        createdAt: { lt: users7DaysAgo },
      },
    });
    console.log(`[CRON] Deleted ${secEventsRes.count} expired security events.`);

    console.log('[CRON] Cleanup completed successfully!');
  } catch (error) {
    console.error('[CRON] Error during cleanup:', error);
  }
});
