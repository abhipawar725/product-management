import express from "express"
import { createProduct } from "../controller/productController.js"

const productRouter = express.Router()

productRouter.post("/api/product/create", createProduct)

export default productRouter