const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.userRegister = async (req,res)=>{
    try {
        const{userName, email ,password} =req.body;
        
        console.log('userName--->',req.body);
        

        if(!userName || !password || !email){
           return res.status(401).json({
                Success : false,
                message:'Must fill all the fields'
            })
        }

        const userData = {userName, password, email}

        const user = await User.create(userData)

        res.status(200).json({
            Success:true,
            message:"User registered successfully ",
            user
        })

    } catch (error) {
        res.status(400).json({
            Success:false,
            message:error.message
        })
    }
}

exports.userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;

        // console.log('email------>',req.body);
        

        if(!email || !password){
          return  res.status(400).json({
                Success : false,
                message:"Must full all fields"
            })
        }

        const userData = await User.findOne({email});
        // console.log(userData);
        

        if(!userData){
           return res.status(400).json({
                Success:false,
                message:'No user found'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password,userData.password);

        // console.log(isPasswordMatched);
        

        if(!isPasswordMatched){
          return  res.status(400).json({
                Success:false,
                message:'Password missmatch'
            })
        }

        const options = {
            userId : userData._id,
            userRole : userData.role
        }

        
        const token = jwt.sign(options , process.env.JWT_SECREAT_KEY,{expiresIn:"7d"});


        const userDataWithoutPassword = userData.toObject();
        delete userDataWithoutPassword.password;

        


        res.status(200).cookie("token" , token).json({
            Success:true,
            message:"User logged in successfully",
            user:userDataWithoutPassword
        })
    } catch (error) {
        res.status(400).json({
            Success:false,
            message: error.message
        })
    }

}

exports.userLogout = (req,res)=>{
    try {
        res.status(200).clearCookie("token").json({
            Success:true,
            message:"User logged out"
        })
    } catch (error) {
        res.status(400).json({
            Success:false,
            message:error.message
        })
    }
}

exports.getAllUsers = async (req,res)=>{
    try {
        const users = await User.find()

        if(!users){
            res.status(500).json({
                Success: false,
                message:"No users found in database"
            })
        }

        res.status(200).json({
            Success: true,
            users : users
        })


    } catch (error) {
        res.status(200).json({
            Success:false,
            message:error.message
        })
    }
}

exports.changeUserRole = async (req,res)=>{
    try {
        const {id} = req.params
    const {role} = req.body
    const user = await User.findById(id).select('-password')
    
    if(!user){
        res.status(404).json({
            Success:false,
            message:'user not found'
        })
    }
      
    if(!role){
        res.status(404).json({
            Success:false,
            message:'Please assign a role'
        })
    }


    user.role = role;
    
    const roleUpdatedUser = await user.save()

    res.status(200).json({
        Success:true,
        message:'User role updated successfully..',
        user : roleUpdatedUser
    })


    } catch (error) {
        res.status(400).json({
            Success:false,
            message:error.message
        })
    }
}
