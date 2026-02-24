import { PrismaClient, RoleName } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const modules = ['sales', 'accounting', 'hr', 'marketing', 'website', 'projects', 'pos', 'documents', 'reporting'];
  const actions = ['create', 'read', 'update', 'delete', 'approve', 'export'] as const;

  for (const module of modules) {
    for (const action of actions) {
      await prisma.permission.upsert({
        where: { module_action: { module, action } },
        update: {},
        create: { module, action },
      });
    }
  }

  const company = await prisma.company.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Root Company',
      baseCurrency: 'USD',
    },
  });

  const passwordHash = await hash(process.env.SEED_SUPER_ADMIN_PASSWORD || 'ChangeMe!123', 12);
  await prisma.user.upsert({
    where: { email: process.env.SEED_SUPER_ADMIN_EMAIL || 'superadmin@erp.local' },
    update: {},
    create: {
      email: process.env.SEED_SUPER_ADMIN_EMAIL || 'superadmin@erp.local',
      fullName: 'Super Admin',
      passwordHash,
      role: RoleName.SUPER_ADMIN,
      companyId: company.id,
    },
  });
}

main().finally(async () => prisma.$disconnect());
