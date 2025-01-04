const express = require('express')
const router = express.Router()
const parentsController = require('../controllers/parentsController')   


router.get('/', parentsController.getParents)
router.post('/', parentsController.createParent)
router.put('/:id', parentsController.updateParent)
router.patch('/:id', parentsController.updateVerify)
router.get('/:id', parentsController.getParent)
router.delete('/:id', parentsController.deleteParent)

module.exports = router;