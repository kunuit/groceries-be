const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("RefreshTokens", RefreshTokenSchema);
