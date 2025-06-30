import jwt from "jsonwebtoken"
import sendResponse from "../utils/sendResponse.js"

const verifyToken = (req, res, next) => {
   const token = req.cookies.token
   if(!token) return sendResponse(res, 401, "Access denied")

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        sendResponse(res, 500, error.message)
    }
}

export default verifyToken