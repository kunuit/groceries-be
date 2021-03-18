const mongoose = require('mongoose')

const MeasureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sign: {
    type: String,
    required: true,
    unique: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  
}, { timestamps: true })


module.exports = mongoose.model('Measures', MeasureSchema);