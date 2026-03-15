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

async function deleteCommentById(commentId, postId, userId) {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      postId,
      post: {
        authorId: userId,
      },
    },
    select: {
      id: true,
      postId: true,
      post: {
        select: {
          authorId: true,
        },
      },
    },
  });

  if (!comment) return null;

  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
    select: {
      id: true,
    },
  });
}

module.exports = {
  createCommentById,
  deleteCommentById,
};
