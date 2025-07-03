import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, `${file.fieldname}-${uniqueSuffix}`)
    }
})

const fileFilter = (req, file, cb) => {
 const allowed = ["image/jpg", "image/jpeg", "image/png", "image/webp"]
 if(allowed.includes(file.mimetype)) cb(null, true)
 else cb(new Error("Only jpeg, jpg, png and webp images are allowed"), false) 
}

const upload = multer({storage, fileFilter})

export default upload