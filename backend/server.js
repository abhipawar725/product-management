import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/connectDB.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static("public"))
app.use("/uploads", express.static(path.join(__dirname,  "uploads")))
app.set("view engine", "ejs")

app.use("/", userRoute)

connectDB()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`app is connected on ${PORT}`))