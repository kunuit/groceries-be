const categorySchema = require("../../models/schema/category.schema");
const { resSuccess, resError } = require("../../utils/response");

const createCategory = async (req, res) => {
  try {
    const { tier, name, parentId, color } = req.body;

    const data = await categorySchema.create({
      tier,
      name,
      parentId,
      color,
    });

    if (!data) throw new Error("Do not create category");
    return resSuccess(res, data);
  } catch (error) {
    return resError(res, { message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const query = await categorySchema.find({ isDeleted: false });
    console.log(query);
    if (!query) throw new Error("category is empty");
    return resSuccess(res, query);
  } catch (error) {
    return resError(res, { message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
};
