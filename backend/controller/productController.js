import Product from "../models/productModel.js";
import sendResponse from "../utils/sendResponse.js";

export const createProduct = async (req, res) => {
    
    try {
        const image = req.file.path.replace(/\\/g, '/')
        
        const { title, price, desc } = req.body

        if (!title || !price) return sendResponse(res, 400, "Title and price are required")

        const ExistingProduct = await Product.findOne({ title })
        if (ExistingProduct) return sendResponse(res, 401, "Product already exists")

       const productData = {
        title,
        price
       }

       if (desc) productData.desc = desc
       if (image) productData.image = image

        const product = await Product.create(productData)

        sendResponse(res, 201, "Product added successfully", product)
    } catch (error) {
        sendResponse(res, 500, error.message)
    }
}

export const readProducts = async (req, res) => {
    console.log(req.query);
    
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
        const updatedData = {
            ...req.body
        }

        if(req.file){
            updatedData.image = req.file.path.replace(/\\/g, '/')
        }

        const product = await Product.findByIdAndUpdate(id, updatedData, {new: true})
        if (!product) return sendResponse(res, 404, "product not found")
            sendResponse(res, 200, "product updated successfully", {product})
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
