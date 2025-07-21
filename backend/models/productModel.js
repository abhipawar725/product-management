import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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

productSchema.plugin(mongoosePaginate)

const Product = model("Product", productSchema)

export default Product