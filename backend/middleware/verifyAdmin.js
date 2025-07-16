import sendResponse from "../utils/sendResponse.js"

const verifyAdmin = async (req, res, next) => {
   if(!req.user) return res.status(400).send("Unauthorized")
   next()
}

export default verifyAdmin