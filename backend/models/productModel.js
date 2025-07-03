import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    desc: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true
    },
    image: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Product = model("Product", productSchema)

export default Product