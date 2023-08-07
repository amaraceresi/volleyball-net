const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://aceresi95:password123.@cluster0.1iz1ala.mongodb.net/'
);

module.exports = mongoose.connection;