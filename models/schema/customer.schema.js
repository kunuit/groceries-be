const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isRegister: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true
  },
  passwordSalt: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
  }
  
}, { timestamps: true })


module.exports = mongoose.model('Customers', CustomerSchema);