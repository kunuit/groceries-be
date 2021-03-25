const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const AuthController = require("../controllers/customer.controllers/auth.controllers");
const BasketController = require("../controllers/customer.controllers/basket.controllers");
const FavoriteController = require("../controllers/customer.controllers/favorite.controllers");

// auth
router.post("/login", AuthController.logIn);
router.post("/register", AuthController.register);
router.post("/refreshToken", AuthController.onRefreshToken);

// basket
router.get("/basket", verifyToken, BasketController.getAllBasket);
router.post("/basket", verifyToken, BasketController.addProductToBasket);

// favorite
router.get("/favorite", verifyToken, FavoriteController.getAllFavorite);
router.post("/favorite", verifyToken, FavoriteController.addProductToFavorite);

module.exports = router;
