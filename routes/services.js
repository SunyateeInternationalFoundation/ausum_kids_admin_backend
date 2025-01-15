const express = require("express");
const router = express.Router();

const servicesController = require("../controllers/serviceController");

router.get("/", servicesController.getServices);
router.post("/", servicesController.addService);
router.put("/:id", servicesController.updateService);
router.delete("/:id", servicesController.deleteService);

module.exports = router;
