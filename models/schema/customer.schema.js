const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CustomerSchema = new mongoose.Schema(
  {
    isDeleted: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isRegister: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    // passwordSalt: {
    //   type: String,
    //   required: true,
    // },
    gender: {
      type: Number,
    },
  },
  { timestamps: true },
);

CustomerSchema.pre("save", async function (next) {
  var customer = this;

  // only hash the password if it has been modified (or is new)
  if (!customer.isModified("password")) return next();

  //hash password
  var hash = await bcrypt.hash(customer.password, 10);

  // overwrite password
  customer.password = hash;
  next();
});

module.exports = mongoose.model("Customers", CustomerSchema);
