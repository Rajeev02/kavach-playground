import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs'; // Need to install bcryptjs

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Demo Database...');

  // 1. Create a Global Demo Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Global Demo Environment',
      isSandbox: false,
    },
  });

  const demoPasswordHash = await bcrypt.hash('Demo@123', 10);

  // 2. Create the 3 Demo Users
  const users = [
    { email: 'admin@demo.com', role: 'admin' },
    { email: 'developer@demo.com', role: 'developer' },
    { email: 'user@demo.com', role: 'user' },
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
