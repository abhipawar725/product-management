import express from "express"
import { createProduct, deleteProductById, readProductById, readProducts, updateProductById } from "../controller/productController.js"
import verifyAdmin from "../middleware/verifyAdmin.js"
import verifyToken from "../middleware/verifyToken.js"
import upload from "../middleware/upload.js"

const productRouter = express.Router()

productRouter.get("/api/product", readProducts)
productRouter.get("/api/product/:id", readProductById)

productRouter.get("/product/create", verifyToken, verifyAdmin, (req, res) => {
    res.render("products/create", {title: 'create product'})
})

productRouter.get("/product/edit", verifyToken, verifyAdmin, (req, res) => {
    res.render("products/edit", {title: 'edit product'})
})

productRouter.post("/api/product/create", verifyToken, verifyAdmin, upload.single('image'), createProduct)
productRouter.put("/api/product/update/:id", verifyToken, verifyAdmin, upload.single('image'), updateProductById)
productRouter.delete("/api/product/delete/:id", verifyToken, verifyAdmin, deleteProductById)

export default productRouter