const mongoose = require("mongoose");

//!  kêu công chụp lại bảng baskets
const BasketSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Number,
      default: false,
    },
    status: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Baskets", BasketSchema);
