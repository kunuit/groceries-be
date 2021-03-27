const mongoose = require("mongoose");

const WarehouseItemSchema = new mongoose.Schema(
  {
    isDelete: {
      type: Boolean,
      default: false,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("WarehouseItems", WarehouseItemSchema);
