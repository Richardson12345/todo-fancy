const express = require("express");
var router = express.Router()
var userController = require("../controller/userController");

router.post("/signup", userController.createUser);
router.post("/signin", userController.signIn);
router.post('/fbSignIn', userController.fbSignIn)

module.exports = router