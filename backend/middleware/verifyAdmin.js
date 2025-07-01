import sendResponse from "../utils/sendResponse.js"
import User from "../models/userModel.js"

const verifyAdmin = async (req, res, next) => {
    const {id} = req.user
    if(!id) return sendResponse(res, 401, "Unauthorised")
    
    const user = await User.findById(id)
    
    if(user.role !== "admin"){
    return res.status(403).json({message: "Admin access only"})
    }
    next()
}

export default verifyAdmin