// This script creates two authors with no blog posts using Prisma
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function main() {
  const authors = await prisma.author.createMany({
    data: [
      {
        name: 'Sample Author One',
        twitter: null,
        photo: null,
        bio: 'This is the first sample author with no blog posts.',
      },
      {
        name: 'Sample Author Two',
        twitter: null,
        photo: null,
        bio: 'This is the second sample author with no blog posts.',
      },
    ],
  });
  console.log('Created authors:', authors);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 