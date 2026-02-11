const prisma = require('../lib/prisma.js');
const { users } = require('./seedData.js');

async function main() {
  console.log('Start seeding...');

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        email: user.email,
        username: user.username,
        password: user.password,
        isAuthor: user.isAuthor,
        posts: {
          create: user.posts,
        },
      },
    });
    console.log(`Username ${user.username} data added.`);
  }

  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
