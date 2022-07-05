const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const env = {
  databaseUrl: process.env.DATABASE_URL || "mongodb://localhost:27017",
  databaseName: process.env.DATABASE_NAME || "online-shop",
  apiBaseUrl: process.env.API_BASE_URL || "localhost:3000",
  secretSessionKey: process.env.SECRET_SESSION_KEY || "veryHardToGuessKey",
  filesDestination: process.env.FILES_DESTINATION || "product-data/images",
};

module.exports = env;
