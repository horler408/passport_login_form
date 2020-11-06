const express = require("express");
const router = express.Router();

const controller = require('./../controllers/userController')
const { forwardAuthenticated } = require("../config/auth");


router.get("/signup", forwardAuthenticated, controller.signup);
router.get("/signin", forwardAuthenticated, controller.signin);
router.get("/logout", controller.logout)
router.post("/register", controller.register)
router.post("/login", controller.login)
router.get("/user/:id", controller.deleteUser)
router.get("/users", controller.getUsers)


module.exports = router;