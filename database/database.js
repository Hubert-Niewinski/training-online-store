const env = require("../config/environment");
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(env.databaseUrl);
  database = client.db(env.databaseName);
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
