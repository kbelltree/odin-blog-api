const express = require('express');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

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
