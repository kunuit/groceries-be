
const ProductSchema = require('../../models/schema/product.schema')
const ProductImageSchema = require('../../models/schema/productImage.schema')

const createProduct = async (req,res) => {
  try {
    const {name, description, price, categoryId, measureId, features, height, length, weight, width } = req.body
    // console.log({name, description, price, categoryId, measureId, features, height, length, weight, width}, 'data')

    const urlImage = 'https://lh3.googleusercontent.com/proxy/Bo2jK1aYpGE29Lz8FIMuAY8yuwFZhOCeETa0ep5cXgZDBG07Hc5tcbQ5hij_46D4F_lK9WFf7IXtDr0tI3GagCOq3H46d480sgf8kQ'
    
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
      width
    })

    if(!productDetail) throw new Error('Do not create productDetail')

    const productImage = await ProductImageSchema.create({
      url: urlImage,
      productId: productDetail._id
    })

    if(!productImage) throw new Error('Do not create productImage')

    res.send({message: 'product is created successfully'})
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}


module.exports = {
  createProduct
}