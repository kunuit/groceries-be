const ProductSchema  = require('../../models/schema/product.schema')
const ProductImageSchema = require('../../models/schema/productImage.schema')

const getAllProductCustomer = async (req,res) => {
  try {
    const queryProduct = await ProductSchema.find({isDeleted: false})
    if(!queryProduct) throw new Error('Do not query all product')

    const listProduct = await Promise.all(queryProduct.map(async (item) => {
      const arrImage = await ProductImageSchema.find({productId: item._id})
      return {
        ...item._doc,
        urlImages: arrImage
      }
    }))

    if(!listProduct) throw new Error('Do not query image in product')

    res.send(listProduct)

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

module.exports = {
  getAllProductCustomer
}