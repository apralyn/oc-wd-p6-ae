const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const saucesCtrl = require("..constrollers/sauces");

const Sauce = require("../models/sauce");

router.get("/", auth, saucesCtrl.getAllSauces);
router.post("/", auth, saucesCtrl.createSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);

module.exports = router;
