const { Router } = require('express');
const postController = require('../controllers/postController');
const uuidValidator = require('../middlewares/validations/uuidValidator');
const posts = Router();

// For Public

// GET all published posts
posts.get('/', postController.getAllPublishedPosts);

// GET a published post by id
posts.get(
  '/:postId',
  uuidValidator.validateUuidInParam('postId'),
  postController.getPublishedPostById
);

// For Authed

// GET all posts where authorId === req.user.id.
// posts.get('/me');

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
