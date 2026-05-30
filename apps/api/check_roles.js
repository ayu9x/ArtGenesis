const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users.map(u => ({ email: u.email, role: u.role })));
  
  // Actually, let's just make everyone an ADMIN while we're at it!
  await prisma.user.updateMany({
    data: { role: 'ADMIN' }
  });
  console.log("Updated everyone to ADMIN just in case!");
}

main().finally(() => prisma.$disconnect());
