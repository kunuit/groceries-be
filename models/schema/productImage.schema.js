const mongoose = require('mongoose')

const ProductImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  }
  
}, { timestamps: true })


module.exports = mongoose.model('ProductImages', ProductImageSchema);