const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.put("/update-profile", adminController.updateProfile);

module.exports = router;
