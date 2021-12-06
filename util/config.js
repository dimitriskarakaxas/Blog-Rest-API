require("dotenv").config();

module.exports = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
};
