const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
  },
  addressDetail: {
    type: String,
    required: true
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  ward: {
    type: string
  },
  
}, { timestamps: true })


module.exports = mongoose.model('Baskets', AddressSchema);