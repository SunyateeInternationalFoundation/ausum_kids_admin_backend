const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.put("/update-profile", adminController.updateProfile);
router.post("/add-admin", adminController.addAdmin);
router.get("/admins", adminController.getAdmins);
module.exports = router;
