import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/connectDB.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.set("view engine", "ejs")

app.use("/", userRoute)

connectDB()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`app is connected on ${PORT}`))