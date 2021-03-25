const { verify } = require("jsonwebtoken");
require("dotenv").config();
const CustomerSchema = require("../models/schema/customer.schema");
const { resError, resErrorExpireToken } = require("../utils/response");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return resError(res, { message: "Token is empty" });
    const token = req.headers.authorization.split(" ")[1];
    const decode = verify(token, process.env.SECRET_TOKEN);
    const { email } = decode;
    const existCustomer = await CustomerSchema.findOne({ email });
    !existCustomer && resError(res, { message: "Token invalid" });
    req.customer = {
      customerId: existCustomer._id,
      username: existCustomer.username,
      email: existCustomer.email,
    };
    next();
  } catch (error) {
    if (error.message == "jwt expired")
      return resErrorExpireToken(res, { message: "jwt expired" });
    return resError(res, { message: error.message });
  }
};
