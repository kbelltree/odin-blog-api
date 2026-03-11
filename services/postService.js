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

async function findPublishedPostById(postId) {
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
          createdAt: true,
          commentAuthor: {
            select: {
              username: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

async function listPostsByCurrentUserId(userId) {
  return prisma.post.findMany({
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

async function findProtectedPostById(postId, userId) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
    },
  });
}

async function createPost(title, content, userId, shouldPublish = false) {
  return await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId,
      publishedAt: shouldPublish ? new Date() : null,
    },
    select: { id: true, createdAt: true, publishedAt: true },
  });
}

async function publishPostById(postId, userId) {
  return await prisma.post.update({
    where: {
      id: postId,
      authorId: userId,
    },
    data: {
      publishedAt: new Date(),
    },
    select: {
      id: true,
      publishedAt: true,
    },
  });
}

async function unpublishPostById(postId, userId) {
  return await prisma.post.update({
    where: {
      id: postId,
      authorId: userId,
    },
    data: {
      publishedAt: null,
    },
    select: {
      id: true,
      publishedAt: true,
    },
  });
}

async function updatePostById(postId, userId, title, content) {
  return await prisma.post.update({
    where: {
      id: postId,
      authorId: userId,
    },
    data: {
      title,
      content,
      publishedAt: new Date(),
    },
    select: {
      id: true,
      publishedAt: true,
    },
  });
}

async function deletePostById(postId, userId) {
  return await prisma.post.delete({
    where: {
      id: postId,
      authorId: userId,
    },
    select: {
      id: true,
    },
  });
}

module.exports = {
  listPublishedPosts,
  findPublishedPostById,
  listPostsByCurrentUserId,
  findProtectedPostById,
  createPost,
  publishPostById,
  unpublishPostById,
  updatePostById,
  deletePostById,
};
