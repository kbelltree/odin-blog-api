const postService = require('../services/postService');
const commentService = require('../services/commentService');

async function getAllPublishedPosts(req, res, next) {
  try {
    const posts = await postService.listPublishedPosts();

    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
}

async function getPublishedPostById(req, res, next) {
  const { postId } = req.params;
  try {
    const post = await postService.listPublishedPostById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found by the Id.' });
    }

    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
}

async function getAllPostsByCurrentUserId(req, res, next) {
  const userId = req.user.id;

  try {
    const posts = await postService.listPostsByCurrentUserId(userId);

    if (!posts) {
      return res.status(404).json({ error: 'Post not found by the userId.' });
    }

    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
}

async function createPostDraft(req, res, next) {
  const { title, content } = req.body;

  try {
    const createdAt = await postService.createPost(title, content, req.user.id);

    return res.status(200).json(createdAt);
  } catch (err) {
    return next(err);
  }
}

async function publishPost(req, res, next) {
  const { postId } = req.params;

  try {
    const publishedAt = await postService.publishPostById(postId, req.user.id);

    return res.status(200).json(publishedAt);
  } catch (err) {
    return next(err);
  }
}

async function unpublishPost(req, res, next) {
  const { postId } = req.params;

  try {
    const publishedAt = await postService.unpublishPostById(
      postId,
      req.user.id
    );

    return res.status(200).json(publishedAt);
  } catch (err) {
    return next(err);
  }
}

async function updatePost(req, res, next) {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const republishedAt = await postService.updatePostById(
      postId,
      req.user.id,
      title,
      content
    );

    return res.status(200).json(republishedAt);
  } catch (err) {
    return next(err);
  }
}

async function deletePost(req, res, next) {
  const { postId } = req.params;

  try {
    const deletedId = await postService.deletePostById(postId, req.user.id);

    return res.status(200).json(deletedId);
  } catch (err) {
    return next(err);
  }
}

async function createComment(req, res, next) {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const result = await commentService.createCommentById(
      postId,
      content,
      req.user.id
    );

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllPublishedPosts,
  getPublishedPostById,
  getAllPostsByCurrentUserId,
  createPostDraft,
  publishPost,
  unpublishPost,
  updatePost,
  deletePost,
  createComment,
};
