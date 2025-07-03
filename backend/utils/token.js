import jwt from "jsonwebtoken"

export const sendToken = (user, res, message = "success") => {
 const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
 res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
})

return res.status(200).json({
    message,
    data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    }
})
}