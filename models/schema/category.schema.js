const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  tier: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  parentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  }
  
}, { timestamps: true })


module.exports = mongoose.model('Categories', CategorySchema);