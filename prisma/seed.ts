import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin1234';

  const password = await bcrypt.hash(adminPass, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, name: 'Campaign Admin', role: 'ADMIN', password },
    update: {}
  });

  await prisma.event.createMany({
    data: [
      { title: 'Constituency Roadshow', body: 'Meet & greet with locals.', date: new Date(Date.now()+86400000), location: 'Town Hall' },
      { title: 'Healthcare Roundtable', body: 'Discuss clinic upgrades.', date: new Date(Date.now()+172800000), location: 'Community Clinic' }
    ],
    skipDuplicates: true
  });
}

main().finally(async () => prisma.$disconnect());