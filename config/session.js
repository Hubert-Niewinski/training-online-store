const env = require("./environment");
const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: env.databaseUrl,
    databaseName: env.databaseName,
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: env.secretSessionKey,
    resave: false,
    saveUnitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
