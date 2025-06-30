import express from "express"
import { UpdateProfile, Dashboard, GetLogin, GetSignup, Login, Logout, Signup, upload } from "../controller/userController.js"
import verifyToken from "../middleware/verifyToken.js"

const userRoute = express.Router()

userRoute.post("/api/signup", Signup)
userRoute.post("/api/login", Login)
userRoute.post("/api/profile/upload", verifyToken, upload.single('picture'), UpdateProfile)

userRoute.get("/dashboard", verifyToken, Dashboard)
userRoute.get("/signup", GetSignup)
userRoute.get("/login", GetLogin)
userRoute.get("/logout", Logout)

export default userRoute