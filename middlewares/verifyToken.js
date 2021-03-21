const { verify } = require("jsonwebtoken");
require("dotenv").config();
const CustomerSchema = require("../models/schema/customer.schema");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(400).send({ message: "Token is empty" });
    const token = req.headers.authorization.split(" ")[1];
    const decode = verify(token, process.env.SECRET_TOKEN);
    const { email } = decode;
    const existCustomer = await CustomerSchema.findOne({ email });
    !existCustomer && res.status(400).send({ message: "Token invalid" });
    req.customer = {
      customerId: existCustomer._id,
      username: existCustomer.username,
      email: existCustomer.email,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Verify token error" });
  }
};
