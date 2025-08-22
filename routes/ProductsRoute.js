const express = require("express");
const productRoute = express.Router();
const { controllerAddProduct, controllerGetAllProducts, getProductsByPagination } = require("../controllers/Products");

productRoute
    .post("/addProduct", controllerAddProduct)
    .get("/", controllerGetAllProducts)
    .post("/getProductByPagination", getProductsByPagination)

module.exports = productRoute;