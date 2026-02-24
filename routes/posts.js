const { Router } = require('express');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const uuidValidator = require('../middlewares/validations/uuidValidator');
const postValidator = require('../middlewares/validations/postValidator');
const posts = Router();
const passport = require('passport');
const authenticateJWT = passport.authenticate('jwt', { session: false });

// Public
posts.get('/', postController.getAllPublishedPosts);

posts.get(
  '/:postId',
  uuidValidator.validateUuidInParam('postId'),
  postController.getPublishedPostById
);

// Protected
posts.post(
  '/',
  authenticateJWT,
  userController.authorizeAuthor,
  postValidator.validatePost,
  postController.createPostDraft
);

posts.put(
  '/:postId/publish',
  uuidValidator.validateUuidInParam('postId'),
  authenticateJWT,
  userController.authorizeAuthor,
  postController.publishPost
);

posts.put(
  '/:postId/unpublish',
  uuidValidator.validateUuidInParam('postId'),
  authenticateJWT,
  userController.authorizeAuthor,
  postController.unpublishPost
);

posts.put(
  '/:postId',
  uuidValidator.validateUuidInParam('postId'),
  authenticateJWT,
  userController.authorizeAuthor,
  postValidator.validatePost,
  postController.updatePost
);

posts.delete(
  '/:postId',
  uuidValidator.validateUuidInParam('postId'),
  authenticateJWT,
  userController.authorizeAuthor,
  postController.deletePost
);

module.exports = posts;
