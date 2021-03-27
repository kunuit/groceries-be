const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema(
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
    addressDetail: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/736x/76/07/5c/76075c11bfe509ee9a11d9baa991c40d.jpg",
    },
  },
  { timestamps: true },
);

AdminSchema.pre("save", async function (next) {
  var customer = this;

  // only hash the password if it has been modified (or is new)
  if (!customer.isModified("password")) return next();

  //hash password
  var hash = await bcrypt.hash(customer.password, 10);

  // overwrite password
  customer.password = hash;
  next();
});

module.exports = mongoose.model("Admins", AdminSchema);
