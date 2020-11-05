const express = require("express");
const router = express.Router();

const controller = require('./../controllers/indexController')

router.get("/", controller.home)
router.get("/dashboard", ensureAuthenticated, controller.dashboard)

module.exports = router;
