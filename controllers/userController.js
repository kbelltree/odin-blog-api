const userService = require('../services/userService');

async function getUserInfo(req, res, next) {
  try {
    const { id, username, isAuthor } = req.user;

    return res.status(200).json({ id, username, isAuthor });
  } catch (err) {
    return next(err);
  }
}

async function enableAuthorRole(req, res, next) {
  const userId = req.user.id;

  try {
    const authorStatus = await userService.promoteToAuthor(userId);

    return res.status(200).json(authorStatus);
  } catch (err) {
    return next(err);
  }
}

function authorizeAuthor(req, res, next) {
  if (!req.user.isAuthor) {
    return res.status(401).json({ error: 'Author status not granted.' });
  }

  return next();
}

module.exports = { enableAuthorRole, authorizeAuthor, getUserInfo };
