require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, {
    connectTimeoutMS: 2000,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database connected'))
.catch(error => console.error('Connection error:', error));
