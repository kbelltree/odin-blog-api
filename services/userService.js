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

async function findUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

async function promoteToAuthor(id) {
  return await prisma.user.update({
    where: { id },
    data: { isAuthor: true },
    select: { username: true, isAuthor: true },
  });
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  promoteToAuthor,
};
