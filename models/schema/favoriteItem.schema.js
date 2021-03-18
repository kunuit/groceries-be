const mongoose = require('mongoose')

const FavoriteItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  favoriteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Favorites',
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  }
  
}, { timestamps: true })


module.exports = mongoose.model('FavoriteItems', FavoriteItemSchema);