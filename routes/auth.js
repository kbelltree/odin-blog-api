const { Router } = require('express');

const auth = Router();

// GET register form
auth.get('/register');
// POST register form
auth.post('/register');

// GET login form
auth.get('/login');
// POST login form
auth.post('/login');

// POST logout
auth.post('/logout');

module.exports = auth;
