import User from "../models/userModel.js"
import sendResponse from "../utils/sendResponse.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import multer from "multer"

export const GetSignup = (req, res) => {
    res.render('signup')
}

export const GetLogin = (req, res) => {
    res.render('login')
}

export const Signup = async (req, res) => {
   try {
    const {fullname, email, password} = req.body
    if(!fullname || !email || !password) return sendResponse(res, 401, "All fields are required")

    const existingUser = await User.findOne({email})
    if(existingUser) return sendResponse(res, 409, "User already exists")

    const newUser = await User.create({fullname, email, password})

    res.status(201).json({
      message: "User created successfully",
      data: {id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email},
        redirect: 'login'  
    })

   } catch (error) {
     sendResponse(res, 500, error.message) 
   }   
}

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body
    if(!email || !password) return sendResponse(res, 401, "All fields are required")

    const user = await User.findOne({email})
    if(!user) return sendResponse(res, 404, "User not found")
    
    const ismatch = await bcrypt.compare(password, user.password)
    if(!ismatch) return sendResponse(res, 409, "Incorrect password")

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    res.cookie("token", token, {httpOnly: true}) 
    res.status(200).json({message: "Login successfully", redirect: 'dashboard'})    
  } catch (error) {
    sendResponse(res, 500, error.message)
  }   
}

export const Dashboard = async (req, res) => {
   try {
    const {id} = req.user
    const user = await User.findById(id)
    res.render('dashboard', {user})        
   } catch (error) {
    console.log(error.message);
   }
}

export const Logout = (req, res) => {
    res.clearCookie("token")
    res.redirect('login')
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, "/uploads/profile")
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.filename}-${file.originalname}`)
  }
})

export const upload = multer({storage})

export const UpdateProfile = (req, res) => {
  console.log(req.user)
  console.log("test");
}