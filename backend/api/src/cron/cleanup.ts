import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Run at 2:00 AM every day
cron.schedule('0 2 * * *', async () => {
  console.log('[CRON] Starting data retention cleanup...');
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    // Delete old audit events
    const deletedAuditEvents = await prisma.auditEvent.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    });
    console.log(`[CRON] Deleted ${deletedAuditEvents.count} old audit events.`);

    // Delete expired sessions
    const deletedSessions = await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    console.log(`[CRON] Deleted ${deletedSessions.count} expired sessions.`);

  } catch (error) {
    console.error('[CRON] Error during data retention cleanup:', error);
  }
});
