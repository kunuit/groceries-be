const measureSchema = require("../../models/schema/measure.schema");
const { resSuccess, resError } = require("../../utils/response");

const createMeasure = async (req, res) => {
  try {
    const { name, sign } = req.body;

    const data = await measureSchema.create({
      name,
      sign,
    });

    if (!data) throw new Error("Do not create category");
    else return resSuccess(res, data);
  } catch (error) {
    return resError(res, { message: error.message });
  }
};

const getAllMeasure = async (req, res) => {
  try {
    const query = await measureSchema.find({ isDeleted: false });
    console.log(query);
    if (!query) throw new Error("category is empty");
    return resSuccess(res, query);
  } catch (error) {
    return resError(res, { message: error.message });
  }
};

module.exports = {
  createMeasure,
  getAllMeasure,
};
