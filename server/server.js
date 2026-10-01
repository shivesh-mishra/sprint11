require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// PHASE 1: CORS — authorize only the React dev origin
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
}));
app.use(express.json());

app.use('/api/posts', require('./routes/posts'));

// Central error handler (also catches multer errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 400).json({ message: err.message || 'Server error' });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((e) => { console.error('Mongo connection failed:', e.message); process.exit(1); });
