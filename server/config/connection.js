// connection.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost/volleyball-net',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection error: ', error);
  }
};

module.exports = connectDB;
