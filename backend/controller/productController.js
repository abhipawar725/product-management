import Product from "../models/productModel.js";
import sendResponse from "../utils/sendResponse.js";

export const createProduct = async (req, res) => {
    console.log(req.body);
    
    try {
        const { title, price } = req.body

         console.log(req.body);

        if (!title || !price) return sendResponse(res, 400, "Title and price are required")

        const ExistingProduct = await Product.findOne({ title })
        if (ExistingProduct) return sendResponse(res, 401, "Product already exists")

        const product = await Product.create(req.body)

        sendResponse(res, 201, "Product added successfully", product)
    } catch (error) {
        sendResponse(res, 500, error.message)
    }
}

export const readProducts = async (req, res) => {
    try {
        const products = await Product.find()
        sendResponse(res, 200, "get product successfully", products)
    } catch (error) {
        sendResponse(res, 500, error.message)
    }
}

export const readProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) return sendResponse(res, 404, "product not found")
        sendResponse(res, 200, "", product)
    } catch (error) {
        sendResponse(res, 500, error.message)
    }
}

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
        if (!product) return sendResponse(res, 404, "product not found")
            sendResponse(res, 200, "product updated successfully")
    } catch (error) {
        sendResponse(res, 500, error.message)
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) return sendResponse(res, 404, "product not found")
        sendResponse(res, 200, "Product deleted successfully", product)
    } catch (error) {
        sendResponse(res, 500, error.message)
    }
}
