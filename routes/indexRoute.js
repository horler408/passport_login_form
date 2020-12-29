const express = require("express");
const router = express.Router();

const controller = require('./../controllers/indexController')
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


router.get("/", controller.home);
router.get("/about", forwardAuthenticated, controller.about);
router.get("/users", forwardAuthenticated, controller.users);
router.get("/dashboard", ensureAuthenticated, controller.dashboard)

module.exports = router;
