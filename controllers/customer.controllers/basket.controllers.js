const SchemaBasket = require("../../models/schema/basket.schema");
const SchemaItemBasket = require("../../models/schema/basketItem.schema");
const SchemaProduct = require("../../models/schema/product.schema");
const { resSuccess, resError } = require("../../utils/response");

const addProductToBasket = async (req, res) => {
  try {
    const { infoProducts } = req.body;
    const { customerId } = req.customer;

    const createBasket = await SchemaBasket.create({
      customerId,
    });

    let totalPrice = 0;

    const itemBasketsNotExit = await Promise.all(
      infoProducts.map(async (infoProduct) => {
        const isProduct = await SchemaProduct.findOne({
          _id: infoProduct.productId,
        });
        if (!isProduct) return;

        totalPrice = totalPrice + isProduct.price + infoProduct.quantity;

        const createItemBasket = await SchemaItemBasket.create({
          productId: infoProduct.productId,
          basketId: createBasket._id,
          price: isProduct.price,
          quantity: infoProduct.quantity,
        });

        return createItemBasket;
      }),
    );

    createBasket.totalPrice = totalPrice;

    await createBasket.save();

    return resSuccess(res, "addProductToBasket is success");
  } catch (error) {
    return resError(res, { message: error.message });
  }
};

const getAllBasket = async (req, res) => {
  try {
    const { customerId } = req.customer;

    const allBasketOfCustomer = await SchemaBasket.find({ customerId });

    if (!allBasketOfCustomer || allBasketOfCustomer.length == 0) {
      return resSuccess(res, []);
    }

    const BasketDetails = await Promise.all(
      allBasketOfCustomer.map(async (basket) => {
        const ItemBasketDetail = await SchemaItemBasket.find({
          basketId: basket._id,
        }).populate("productId");

        return {
          ...basket._doc,
          ItemBasketDetail,
        };
      }),
    );

    return resSuccess(res, BasketDetails);
  } catch (error) {
    return resError(res, { message: error.message });
  }
};

module.exports = {
  addProductToBasket,
  getAllBasket,
};
