const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const ProductAdminCtr = require("../controllers/product.controllers/productAdmin.controller");
const ProductCustomerCtr = require("../controllers/product.controllers/productCustomer.controller");
const MeasureCtr = require("../controllers/category.controllers/measure.controller");

//* admin
// create product
router.post("/", ProductAdminCtr.createProduct);
// create measure
router.post("/measure", MeasureCtr.createMeasure);

//* customer & admin
// get product
router.get("/", verifyToken, ProductCustomerCtr.getAllProductCustomer);
// get meansure
router.get("/measure", MeasureCtr.getAllMeasure);

module.exports = router;
