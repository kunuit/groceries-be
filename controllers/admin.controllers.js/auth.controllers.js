const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
require("dotenv").config();

const SchemaAdmin = require("../../models/schema/admin.schema");
const SchemaRefreshToken = require("../../models/schema/refeshToken.schema");
const { resSuccess, resError } = require("../../utils/response");

const register = async (req, res) => {
  try {
    let { username, password, email, gender, addressDetail, phone } = req.body;
    // TODO check validation password, email (unique), username (unique)
    const isUsername = await SchemaAdmin.findOne({ username });
    if (isUsername) return resError(res, { message: "username exists" }); // username (unique)
    const isEmail = await SchemaAdmin.findOne({ email });
    if (isEmail) return resError(res, { message: "email exists" }); // email (unique)

    const signupAcc = await SchemaAdmin.create({
      username,
      password,
      email,
      gender,
      addressDetail,
      phone,
      // avatar
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
    const isInfo = await SchemaAdmin.findOne({
      $or: [{ email: info }, { username: info }],
    });
    console.log(isInfo);
    if (!isInfo)
      return resError(res, { message: "email or username is not exist" });
    // TODO check password
    const checkPassword = await compare(password, isInfo.password);
    if (!checkPassword) return resError(res, { message: "wrong password" });

    // TODO sign In and return token
    const token = sign(
      {
        username: isInfo.username,
        email: isInfo.email,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "30s" },
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
      phone: isInfo.phone,
      addressDetail: isInfo.addressDetail,
      avatar: isInfo.avatar,
    });
  } catch (error) {
    // console.log(error)
    return resError(res, { message: error.message });
  }
};

module.exports = {
  logIn,
  register,
};
