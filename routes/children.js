const express = require('express')
const router = express.Router()
const childrenController = require('../controllers/childrenController')


router.get('/', childrenController.getChildren)
router.get('/:id', childrenController.getChild) 

module.exports = router;