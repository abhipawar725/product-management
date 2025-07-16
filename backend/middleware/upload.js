import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products")
    },
    filename: (req, file, cb) => {
         const name = file.originalname.replace(/\s+/g, "_")   
        cb(null, `${name}`)
    }
})

const upload = multer({storage})

export default upload