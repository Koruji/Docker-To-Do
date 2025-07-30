require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

// For local development
// const mongoURI = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(mongoURI)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Connection error:', error));
