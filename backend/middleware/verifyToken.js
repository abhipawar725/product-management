import jwt from "jsonwebtoken"
import sendResponse from "../utils/sendResponse.js"
import User from "../models/userModel.js"

const verifyToken = async (req, res, next) => {
   const token = req.cookies.token
   if(!token) return sendResponse(res, 401, "Access denied")

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if(!user) return res.status(404).json({message: "user not found"})
        req.user = user
        res.locals.user = user        
        next()
    } catch (error) {
        sendResponse(res, 500, error.message)
    }
}

export default verifyToken