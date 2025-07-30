require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/tododb";

mongoose.connect(mongoURI)
.then(() => console.log('Database connected'))
.catch(error => console.error('Connection error:', error));
