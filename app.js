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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:5173'],
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
  return res.status(404).json({ error: '404 - Page Not Found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ error: '500 - Something went wrong.' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Blog API - listening on port ${PORT}`);
});
