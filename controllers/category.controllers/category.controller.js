const categorySchema = require('../../models/schema/category.schema')


const createCategory = async (req,res) => {
  try {
    const {tier, name, parentId} = req.body
    
    const data = await categorySchema.create({
      tier,
      name,
      parentId
    })

    if(!data) throw new Error('Do not create category')
    else res.send(data)
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}


const getAllCategory = async (req,res) => {
  try {
    const query = await categorySchema.find({isDeleted: false})
    console.log(query)
    if(!query) throw new Error('category is empty')
    query && res.send(query)
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

module.exports = {
  createCategory,
  getAllCategory
}