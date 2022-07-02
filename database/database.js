const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  database = client.db(process.env.DATABASE_NAME);
}

function getDb() {
  if (!database) {
    throw new Error("You must connect to the database first!");
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
