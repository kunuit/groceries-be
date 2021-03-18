const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  },
  status: {
    type: Number,
    default:0,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  },
  measureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measures',
    required: true
  },
  features: {
    type: String
  },
  height: {
    type: Number,
  },
  isDiscount: {
    type: Boolean,
    default: false
  },
  length: {
    type: Number
  },
  PriceBeforeDiscount: {
    type: Number,
  },
  weight: {
    type: Number
  },
  width: {
    type: Number
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
  
}, { timestamps: true })


module.exports = mongoose.model('Products', ProductSchema);