const { sign, verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
require("dotenv").config();

const SchemaCustomer = require("../../models/schema/customer.schema");
const SchemaFavorite = require("../../models/schema/favorite.schema");
const SchemaAddress = require("../../models/schema/addressCustomer.schema");
const SchemaRefreshToken = require("../../models/schema/refeshToken.schema");
const { resSuccess, resError } = require("../../utils/response");

const register = async (req, res) => {
  try {
    let { username, password, email, gender, addressDetail, phone } = req.body;
    // TODO check validation password, email (unique), username (unique)
    const isUsername = await SchemaCustomer.findOne({ username });
    if (isUsername) return resError(res, { message: "username exists" }); // username (unique)
    const isEmail = await SchemaCustomer.findOne({ email });
    if (isEmail) return resError(res, { message: "email exists" }); // email (unique)

    const signupAcc = await SchemaCustomer.create({
      username,
      password,
      email,
      gender,
    });

    const createFavorite = await SchemaFavorite.create({
      customerId: signupAcc._id,
    });

    const createAddressDetail = await SchemaAddress.create({
      customerId: signupAcc._id,
      phone,
      addressDetail,
    });

    return resSuccess(res, { message: `${username} is created` });
  } catch (error) {
    // console.log(error)
    return resError(res, { message: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    let { info, password } = req.body;
    // TODO check username is valid
    const isInfo = await SchemaCustomer.findOne({
      $or: [{ email: info }, { username: info }],
    });
    console.log(isInfo);
    if (!isInfo)
      return resError(res, { message: "email or username is not exist" });
    // TODO check password
    const checkPassword = await compare(password, isInfo.password);
    if (!checkPassword) return resError(res, { message: "wrong password" });

    const queryAddressDetail = await SchemaAddress.findOne({
      customerId: isInfo._id,
    });

    // TODO sign In and return token
    const token = sign(
      {
        username: isInfo.username,
        email: isInfo.email,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );

    const refreshToken = sign(
      {
        username: isInfo.username,
        email: isInfo.email,
      },
      process.env.SECRET_REFRESH_TOKEN,
      {
        expiresIn: "1 year",
      },
    );

    const addRefreshToken = await SchemaRefreshToken.create({
      refreshToken,
      email: isInfo.email,
      expiresIn: "1 year",
    });

    return resSuccess(res, {
      token,
      refreshToken,
      username: isInfo.username,
      id: isInfo._id,
      email: isInfo.email,
      phone: queryAddressDetail.phone,
      addressDetail: queryAddressDetail.addressDetail,
    });
  } catch (error) {
    // console.log(error)
    return resError(res, { message: error.message });
  }
};

const onRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return resError(res, {
        message: "Empty refreshToken",
      });
    const isRefreshToken = await SchemaRefreshToken.findOne({
      refreshToken,
    });
    if (!isRefreshToken)
      return resError(res, {
        message: "Invalid refreshToken",
      });
    const { username } = verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
    const customer = await SchemaCustomer.findOne({ username });
    if (!customer)
      return resError(res, {
        message: "Invalid customer",
      });

    const accessToken = sign(
      {
        username: customer.username,
        email: customer.email,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" },
    );
    return resSuccess(res, {
      accessToken,
    });
  } catch (error) {
    return resError(res, {
      message: error.message,
    });
  }
};
module.exports = {
  register,
  logIn,
  onRefreshToken,
};
