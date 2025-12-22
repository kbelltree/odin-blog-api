const prisma = require('../lib/prisma');

async function createUser(email, username, hashedPassword) {
  return await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
    select: {
      username: true,
    },
  });
}

module.exports = { createUser };
