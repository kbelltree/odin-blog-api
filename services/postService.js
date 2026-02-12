const prisma = require('../lib/prisma');

async function listPublishedPosts() {
  return await prisma.post.findMany({
    where: {
      publishedAt: { not: null },
    },
    select: {
      id: true,
      title: true,
      publishedAt: true,
      author: {
        select: { username: true },
      },
    },
    orderBy: { publishedAt: 'desc' },
  });
}

// GET: A full post items that is 'published' and has a specific postId
async function listPublishedPostById(postId) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      publishedAt: { not: null },
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      author: {
        select: {
          username: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          commentAuthor: {
            select: {
              username: true,
            },
          },
        },
        orderBy: { createAt: 'desc' },
      },
    },
  });
}

//GET:  All post items where authorId === req.user.id
async function listPostsByCurrentUserId(userId) {
  prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      publishedAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

module.exports = {
  listPublishedPosts,
  listPublishedPostById,
  listPostsByCurrentUserId,
};
