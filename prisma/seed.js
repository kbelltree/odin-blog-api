const prisma = require('../lib/prisma.js');
const { users } = require('./seedData.js');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('Start seeding...');

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 12);

    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        email: user.email,
        username: user.username,
        password: hashedPassword,
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
