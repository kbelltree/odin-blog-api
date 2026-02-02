const { Router } = require('express');
const postController = require('../controllers/postController');
const uuidValidator = require('../middlewares/validations/uuidValidator');
const posts = Router();
const passport = require('passport');
const authenticateJWT = passport.authenticate('jwt', { session: false });

// GET all published posts (public)
posts.get('/', postController.getAllPublishedPosts);

// GET all posts where authorId === req.user.id (protected)
posts.get('/me', authenticateJWT, postController.getAllPostsByCurrentUserId);

// GET a published post by id (public)
posts.get(
  '/:postId',
  uuidValidator.validateUuidInParam('postId'),
  postController.getPublishedPostById
);

// POST a new blog post as draft
// posts.post('/');

// DELETE an existing blog post by postId and matching authorId
// posts.delete('/:postId');

// PUT an existing blog post by postId and matching authorId
// posts.put('/:postId');

// PUT a published post to unpublish by postId
// posts.put('/:postId');

// PUT a draft to publish by postId
// posts.put('/:postId');

// POST a comment by postId
// posts.post('/:postId/comments');

module.exports = posts;
