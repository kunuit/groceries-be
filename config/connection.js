const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.HOST_MONGO;
console.log(URI)

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('db connected .   .... !');
  } catch (error) {
    console.log("don't connected", error.message);
  }
};

module.exports = connectDB;
