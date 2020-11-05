const express = require("express");
const router = express.Router();

const controller = require('./../controllers/indexController')
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


router.get("/", forwardAuthenticated, controller.home);
router.get("/dashboard", ensureAuthenticated, controller.dashboard)

module.exports = router;
