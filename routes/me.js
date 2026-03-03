const { Router } = require('express');
const passport = require('passport');
const authenticateJWT = passport.authenticate('jwt', { session: false });
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

const me = Router();

me.get('/', authenticateJWT, userController.getUserInfo);

me.get('/posts', authenticateJWT, postController.getAllPostsByCurrentUserId);

me.post('/author', authenticateJWT, userController.enableAuthorRole);

module.exports = me;
