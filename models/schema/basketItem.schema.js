const mongoose = require('mongoose')

const BasketItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  basketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baskets',
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  
}, { timestamps: true })


module.exports = mongoose.model('BasketItems', BasketItemSchema);