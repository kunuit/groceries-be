const mongoose = require("mongoose");

const WarehouseTransactionItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    warehouseTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WarehouseTransactions",
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "WarehouseTransactionItems",
  WarehouseTransactionItemSchema,
);
