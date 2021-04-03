const ProductSchema = require("../../models/schema/product.schema");
const ProductImageSchema = require("../../models/schema/productImage.schema");
const { resSuccess, resError } = require("../../utils/response");

const { cloudinary } = require("../../utils/upload/cloudinary");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      categoryId,
      measureId,
      features,
      height,
      length,
      weight,
      width,
    } = req.body;

    // console.log({name, description, price, categoryId, measureId, features, height, length, weight, width}, 'data')

    const { images } = req.files;

    const productDetail = await ProductSchema.create({
      name,
      description,
      price,
      categoryId,
      measureId,
      features,
      height,
      length,
      weight,
      width,
    });

    if (!productDetail) throw new Error("Do not create productDetail");

    // some image
    if (images.length >= 2) {
      const imageUrls = await Promise.all(
        images.map(async (e) => {
          const imgEncoded =
            "data:image/png;base64," + e.data.toString("base64");

          const uploadedResponse = await cloudinary.uploader.upload(
            imgEncoded,
            {
              upload_preset: "productImage",
            },
          );
          return uploadedResponse.url;
        }),
      );

      if (!imageUrls) throw new Error("Do not upload images");

      const productImages = await Promise.all(
        imageUrls.map(async (url) => {
          const productImage = await ProductImageSchema.create({
            url,
            productId: productDetail._id,
          });
          return productImage;
        }),
      );
      if (!productImages) throw new Error("Do not create productImages");

      return resSuccess(res, { message: "product is created successfully" });
    } else {
      // one image

      const imgEncoded =
        "data:image/png;base64," + images.data.toString("base64");

      const uploadedResponse = await cloudinary.uploader.upload(imgEncoded, {
        upload_preset: "productImage",
      });

      const productImage = await ProductImageSchema.create({
        url: uploadedResponse.url,
        productId: productDetail._id,
      });

      if (!productImage) throw new Error("Do not create productImage");

      return resSuccess(res, { message: "product is created successfully" });
    }
  } catch (error) {
    return resError(res, { message: error.message });
  }
};

module.exports = {
  createProduct,
};
