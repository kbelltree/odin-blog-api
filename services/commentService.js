const prisma = require('../lib/prisma');

async function createCommentById(postId, content, userId) {
  return await prisma.comment.create({
    data: {
      postId,
      content,
      commentAuthorId: userId,
    },
    select: {
      id: true,
      postId: true,
    },
  });
}

module.exports = {
  createCommentById,
};
