const prisma = require('../lib/prisma');

// For Public

async function listPublishedPosts() {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      publishedAt: true,
      authorId: true,
    },
  });
}

// GET: A full post items that is 'published' and has a specific postId
async function listPublishedPostById(postId) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      published: true,
    },
    select: {
      title: true,
      content: true,
      publishedAt: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          commentAuthor: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });
}

module.exports = {
  listPublishedPosts,
  listPublishedPostById,
};
