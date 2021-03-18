const measureSchema = require('../../models/schema/measure.schema')


const createMeasure = async (req,res) => {
  try {
    const {name, sign} = req.body
    
    const data = await measureSchema.create({
      name,
      sign
    })

    if(!data) throw new Error('Do not create category')
    else res.send(data)
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}


const getAllMeasure = async (req,res) => {
  try {
    const query = await measureSchema.find({isDeleted: false})
    console.log(query)
    if(!query) throw new Error('category is empty')
    query && res.send(query)
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

module.exports = {
  createMeasure,
  getAllMeasure
}