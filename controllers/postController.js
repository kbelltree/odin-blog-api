const postService = require('../services/postService');

async function getAllPublishedPosts(req, res, next) {
  try {
    const posts = await postService.listPublishedPosts();
    return res.json(posts);
  } catch (err) {
    return next(err);
  }
}

async function getPublishedPostById(req, res, next) {
  console.log('originalUrl:', req.originalUrl);
  console.log('params:', req.params);

  const { postId } = req.params;
  try {
    const post = await postService.listPublishedPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found by the Id.' });
    }
    return res.json(post);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllPublishedPosts,
  getPublishedPostById,
};
