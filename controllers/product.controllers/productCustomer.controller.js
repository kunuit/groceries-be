const _ = require("lodash");

const ProductSchema = require("../../models/schema/product.schema");
const ProductImageSchema = require("../../models/schema/productImage.schema");
const MeasureSchema = require("../../models/schema/measure.schema");
const { resError, resSuccess } = require("../../utils/response");

const getAllProductCustomer = async (req, res) => {
  try {
    const queryProduct = await ProductSchema.find({
      isDeleted: false,
    }).populate("measureId");
    if (!queryProduct) throw new Error("Do not query all product");

    const listProduct = await Promise.all(
      queryProduct.map(async (item) => {
        const arrImage = await ProductImageSchema.find({ productId: item._id });

        return {
          ...item._doc,
          measureId: {
            name: item.measureId.name,
            sign: item.measureId.sign,
          },
          urlImages: _.map(arrImage, "url"),
        };
      }),
    );

    if (!listProduct) throw new Error("Do not query image in product");

    return resSuccess(res, listProduct);
  } catch (error) {
    return resError(res, { message: error.message });
  }
};

module.exports = {
  getAllProductCustomer,
};
