const { Router } = require('express');

const posts = Router();

// For Authed

// POST a comment by postId
posts.post('/:postId/comment');

// DELETE an existing blog post by postId and matching authorId
posts.delete('/:postId/delete ');

// PUT an existing blog post by postId and matching authorId
posts.put('/:postId/edit');

// PUT a published post to unpublish by postId
posts.put('/:postId/unpublish');

// PUT a draft to publish by postId
posts.put('/:postId/publish');

// POST a new blog post as draft
posts.post('/');

// For Public

// GET a published post by id
posts.get('/:postId');

// GET all published posts
posts.get('/');

module.exports = posts;
