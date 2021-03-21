const { sign } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
require("dotenv").config();

const CustomerSchema = require("../../models/schema/customer.schema");
const SchemaFavorite = require("../../models/schema/favorite.schema");

const register = async (req, res) => {
  try {
    let { username, password, email, gender } = req.body;
    // TODO check validation password, email (unique), username (unique)
    const isUsername = await CustomerSchema.findOne({ username });
    if (isUsername) return res.status(400).send({ message: "username exists" }); // username (unique)
    const isEmail = await CustomerSchema.findOne({ email });
    if (isEmail) return res.status(400).send({ message: "email exists" }); // email (unique)
    // TODO create acc
    const signupAcc = await CustomerSchema.create({
      username,
      password,
      email,
      gender,
    });

    const createFavorite = await SchemaFavorite.create({
      customerId: signupAcc._id,
    });

    createFavorite && res.send({ message: `${username} is created` });
  } catch (error) {
    // console.log(error)
    res.status(400).send({ message: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    // console.log(req.body)
    let { info, password } = req.body;
    // TODO check username is valid
    const isInfo = await CustomerSchema.findOne({
      $or: [{ email: info }, { username: info }],
    });
    console.log(isInfo);
    if (!isInfo) return res.status(400).send({ message: "info is not exist" });
    // TODO check password
    const checkPassword = await compare(password, isInfo.password);
    if (!checkPassword)
      return res.status(400).send({ message: "wrong password" });
    // TODO sign In and return token
    const token = sign(
      {
        username: isInfo.username,
        email: isInfo.email,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "999 years" },
    );
    res.send({
      token,
      username: isInfo.username,
      id: isInfo._id,
    });
  } catch (error) {
    // console.log(error)
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  register,
  logIn,
};
