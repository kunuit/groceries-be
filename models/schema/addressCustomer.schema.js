const mongoose = require("mongoose");

const AddressCustomerSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    addressDetail: {
      type: String,
      required: true,
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
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AddressCustomers", AddressCustomerSchema);
