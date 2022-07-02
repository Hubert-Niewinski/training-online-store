const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const env = {
  databaseUrl: process.env.DATABASE_URL || "mongodb://localhost:27017",
  databaseName: process.env.DATABASE_NAME || "online-shop",
  secretSessionKey: process.env.SECRET_SESSION_KEY || "veryHardToGuessKey",
};

module.exports = env;
