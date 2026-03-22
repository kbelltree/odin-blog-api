const express = require('express');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { findUserByIdForJwt } = require('./services/userService');

const app = express();

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/me');

app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

const allowedOrigins = ['http://localhost:5173'];

// For production
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Set up how to extract token
const tokenExtractOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(tokenExtractOptions, async (jwt_payload, done) => {
    try {
      const user = await findUserByIdForJwt(jwt_payload.sub);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/me', userRouter);

app.use((req, res, next) => {
  return res.status(404).json({ error: 'Page Not Found.' });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body is too large.' });
  }

  return res.status(500).json({ error: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog API - listening on port ${PORT}`);
});
