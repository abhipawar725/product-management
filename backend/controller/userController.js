import User from "../models/userModel.js"
import sendResponse from "../utils/sendResponse.js"
import { sendToken } from "../utils/token.js"
import bcrypt from "bcrypt"
import multer from "multer"

export const GetSignup = (req, res) => {
    res.render('auth/signup')
}

export const GetLogin = (req, res) => {
    res.render('auth/login')
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

    sendToken(user, res, "Login successfully")  
  } catch (error) {
    sendResponse(res, 500, error.message)
  }   
}

export const Dashboard = async (req, res) => {
   try {
    const {id} = req.user
    const user = await User.findById(id)          
    res.render('products/dashboard', {user})        
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
     cb(null, "uploads/profile")
  },
  filename: (req, file, cb) => {
    const name = file.originalname.replace(/\s+/g, "_")
    cb(null, `${name}`)
  }
})

export const upload = multer({storage})

export const UpdateProfile = async (req, res) => {
  try {
    if (!req.file) return sendResponse(res, 400, "No file uploaded");

    const path = '/' + req.file.path.replace(/\\/g, "/"); // ✅ fix here

    const { id } = req.user;
    if (!id) return sendResponse(res, 401, "invalid request id");

    const profile = await User.findById(id);
    if (!profile) return sendResponse(res, 404, "user not found");

    const user = await User.findByIdAndUpdate(id, { picture: path }, { new: true });

    res.status(200).json({
      message: 'profile picture updated successfully',
      picture: user.picture // will now start with "/"
    });

  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
