const express = require("express");

const adminController = require("../controllers/admin.controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

const basePath = "/admin";

router.get(basePath + "/products", adminController.getProducts); // /admin/products

router.get(basePath + "/products/new", adminController.getNewProduct);

router.post(basePath + "/products", imageUploadMiddleware, adminController.createNewProduct);

router.get(basePath + "/products/:id", adminController.getUpdateProduct);

router.post(basePath + "/products/:id", imageUploadMiddleware, adminController.updateProduct);

router.delete(basePath + "/products/:id", adminController.deleteProduct);

router.get(basePath + "/orders", adminController.getOrders);

router.patch(basePath + "/orders/:id", adminController.updateOrder);

module.exports = router;
