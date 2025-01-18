const express = require("express");
const router = express.Router();
const childrenController = require("../controllers/childrenController");

router.get("/", childrenController.getChildren);
router.post("/", childrenController.addChild);
router.put("/:id", childrenController.updateChild);
router.get("/:id", childrenController.getChild);
router.delete("/:id", childrenController.deleteChild);
router.patch("/:id", childrenController.updateVerify);
module.exports = router;
