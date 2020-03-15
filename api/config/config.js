const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongodbUri: process.env.DATABASE_URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET
};