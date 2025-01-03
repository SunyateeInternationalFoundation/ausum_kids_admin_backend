const express = require('express')
const router = express.Router()

const servicesController = require('../controllers/serviceController')

router.get('/', servicesController.getServices)
router.post('/', servicesController.addService)


module.exports = router;