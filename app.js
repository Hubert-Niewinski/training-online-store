const path = require("path");
const express = require("express");
const csrf = require("csurf");

const db = require("./database/database");
const expressSession = require("express-session");
const createSessionConfig = require("./config/session");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const notFoundMiddleware = require("./middlewares/not-found");

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// sets public folders
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));

// sets middleware to extract data from submitted forms and requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// creates session
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

// sets middleware for CSRF attacks protection
app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
// app.use(protectRoutesMiddleware)
app.use(protectRoutesMiddleware, ordersRoutes);
app.use(protectRoutesMiddleware, adminRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to the database");
    console.log(error);
  });
