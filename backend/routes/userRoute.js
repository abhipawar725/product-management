import express from "express"
import { Dashboard, GetLogin, GetSignup, Login, Signup } from "../controller/userController.js"

const userRoute = express.Router()

userRoute.post("/api/signup", Signup)
userRoute.post("/api/login", Login)

userRoute.get("/signup", GetSignup)
userRoute.get("/login", GetLogin)
userRoute.get("/dashboard", Dashboard)

export default userRoute