const mongoose = require("mongoose");

const warehouseTransactionSchema = new mongoose.Schema(
  {
    isDelete: {
      type: Boolean,
      default: false,
    },
    transactionType: {
      type: String,
      required: true,
    },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturers",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "WarehouseTransactions",
  warehouseTransactionSchema,
);
