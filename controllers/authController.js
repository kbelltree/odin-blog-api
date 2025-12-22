const bcrypt = require('bcryptjs');
const userService = require('../services/userService');

async function createNewUser(req, res, next) {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await userService.createUser(
      email,
      username,
      hashedPassword
    );
    return res.status(201).json(newUser);
  } catch (err) {
    // Prisma client error code for the value already exists
    if (err.code === 'P2002') {
      return res
        .status(409)
        .json({ error: 'Email or username is already in use' });
    }
    next(err);
  }
}

module.exports = { createNewUser };
