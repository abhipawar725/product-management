const sendResponse = (res, status, message, data) => {
   return res.status(status).json({message, data})
}
export default sendResponse