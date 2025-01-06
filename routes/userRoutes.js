const { loginController, registerController, authController, getUserProfileController, updateUserProfileController } = require("../controllers/userCtrls")

const authMiddleware = require("../middlewares/authMiddleware")
const express = require("express")

//router object
const router=express.Router()

//routes

//Login||POST
router.post("/login",loginController)

//Register||POST
router.post("/register",registerController)

//Auth || POST
router.post("/getUserData", authMiddleware, authController)

// Get user profile
router.get('/profile', authMiddleware, getUserProfileController);

// Update user profile
router.put('/update-profile', authMiddleware, updateUserProfileController);

// Single export at the end
module.exports = router
