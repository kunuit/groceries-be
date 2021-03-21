const SchemaFavorite = require("../../models/schema/favorite.schema");
const SchemaFavoriteItem = require("../../models/schema/favoriteItem.schema");
const SchemaProduct = require("../../models/schema/product.schema");

const addProductToFavorite = async (req, res) => {
  try {
    const { productIds } = req.body;
    const { customerId } = req.customer;

    const isFavorite = await SchemaFavorite.findOne({ customerId });

    if (!isFavorite) throw new Error("you is not favorite");

    const itemFavorites = await Promise.all(
      productIds.map(async (productId) => {
        const isProduct = await SchemaProduct.findOne({
          _id: productId,
        });
        if (!isProduct) return;

        const createFavoriteItem = await SchemaFavoriteItem.create({
          productId,
          favoriteId: isFavorite._id,
        });

        return createFavoriteItem;
      }),
    );

    itemFavorites && res.send("addProductToFavorite is success");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllFavorite = async (req, res) => {
  try {
    const { customerId } = req.customer;

    const isFavorite = await SchemaFavorite.findOne({ customerId });

    if (!isFavorite) throw new Error("you is not favorite");

    const itemInFavorites = await SchemaFavoriteItem.find({
      favoriteId: isFavorite._id,
    }).populate("productId");

    if (!itemInFavorites || itemInFavorites.length == 0) res.send([]);

    return res.send(itemInFavorites);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  addProductToFavorite,
  getAllFavorite,
};
