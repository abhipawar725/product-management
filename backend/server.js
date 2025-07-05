import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/connectDB.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import productRouter from "./routes/productRoute.js"
import ejsMate from "ejs-mate"

dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static("public"))
app.use("/uploads", express.static(path.join(__dirname,  "uploads")))
app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use("/", userRoute)
app.use("/", productRouter)

connectDB()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`app is connected on ${PORT}`))