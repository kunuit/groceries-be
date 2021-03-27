const express = require("express");
const router = express.Router();

const AuthAdminController = require("../controllers/admin.controllers.js/auth.controllers");
const AuthController = require("../controllers/customer.controllers/auth.controllers");

// auth
router.post("/login", AuthAdminController.logIn);
router.post("/register", AuthAdminController.register);
router.post("/refreshToken", AuthController.onRefreshToken);

module.exports = router;
