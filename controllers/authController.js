const bcrypt = require('bcryptjs');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

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

    return next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'The email is not registered' });
    }

    const isPWMatched = await bcrypt.compare(password, user.password);

    if (!isPWMatched) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
}

module.exports = { createNewUser, login };
