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

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

module.exports = { createUser, findUserByEmail };
