const express = require('express');
const router = express.Router();



const CategoriesCtr = require('../controllers/category.controllers/category.controller')

// admin
router.post('/', CategoriesCtr.createCategory )
// customer && admin
router.get('/', CategoriesCtr.getAllCategory )

module.exports = router;
