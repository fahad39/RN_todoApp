import { now } from "mongoose";
import { User } from "../models/user.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary"
import fs from "fs"

export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const {avatar}=req.files
        
        
        let user= await User.findOne({email})
        if(user){
            return res
                .status(400)
                .json({
                    success:false,
                    message:"User already exists"
                })
        }
        const otp=Math.floor(Math.random()*1000000)
        const filepath=avatar.tempFilePath
        const myCloud=await cloudinary.v2.uploader.upload(filepath,{
            folder:"rn_todoapp"
        })
        fs.rmSync("./tmp",{recursive:true})
        user=await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            },
            otp,
            otp_expiry:new Date(Date.now()+process.env.OTP_EXPIRE*24*60*60*1000),
            task:[]
        })

        await sendMail(email,"Verify your account",`Your OTP is ${otp}`)
        
        sendToken(res,user,201,"OTP sent to your email, Please verify your account")

        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const verify=async(req,res)=>{
    try {
        const otp=Number(req.body.otp)
        const user=await User.findById(req.user._id)
        if(user.otp!==otp){
           return res.status(400).json({success:false,message:"Invalid OTP"})
        }
        
        if(user.otp_expiry<Date.now()){
            return res.status(400).json({success:false,message:"OTP has been expired"})
        }

        user.verified=true;
        user.otp=null;
        user.otp_expiry=null;

        await user.save()

        sendToken(res, user,200,"Account Verified")


        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }

}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        
        if(!email || !password){
            return res
                .status(400)
                .json({
                    success:false,
                    message:"Please Enter all fields"
                })
        }


        let user= await User.findOne({email}).select("+password")
        if(!user){
            return res
                .status(400)
                .json({
                    success:false,
                    message:"Invalid Email or Password"
                })
        }
        const isMatch=await user.comparePassword(password)
        if(!isMatch){
            return res
                .status(400)
                .json({
                    success:false,
                    message:"Invalid Email or Password"
                })
        }
        

        
        sendToken(res,user,200,"Login Successful")
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}


export const logout=async(req,res)=>{
    try {
        
        res.status(200).cookie("token",null,{
            expires:new Date(Date.now())
        }).json({
            success:true,
            message:"Logged out successfully"
        })
      
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const getMyProfile=async(req,res)=>{
    try {
        
       const user=await User.findById(req.user._id)
       sendToken(res,user,201,`Welcome back ${user.name}`)
      
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const updateProfile=async(req,res)=>{
    try {
        
       const user=await User.findById(req.user._id)
       const {name}=req.body
       const {avatar}=req.files
       if(name){
        user.name=name
       }
       if(avatar){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
        const filepath=avatar.tempFilePath
        const mycloud=await cloudinary.v2.uploader.upload(filepath)
        fs.rmSync("./tmp",{recursive:true})
        user.avatar={
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
       }
       await user.save()
       
       res.status(200).json({success:true,message:"profile updated successfully"})
      
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const updatePassword=async(req,res)=>{
    try {
        
       const user=await User.findById(req.user._id).select("+password")
       const {oldPassword,newPassword}=req.body
       if(!oldPassword || !newPassword){
        res.status(400).json({sucess:false,message:"Please enter all fields"})
       }
       const isMatch=await user.comparePassword(oldPassword)
       if(!isMatch){
        return res
            .status(400)
            .json({success:false,message:"invalid old Password"})
       }
       user.password=newPassword
       await user.save()
       
       res.status(200).json({success:true,message:"Password updated successfully"})
      
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}
export const forgetPassword=async(req,res)=>{
    try {
        
       const {email}=req.body
       const user=await User.findOne({email})
       if(!user){
        res.status(400).json({sucess:false,message:"No User Found"})
       }
      
       const otp=Math.floor(Math.random()*1000000)
       user.resetPasswordOtp=otp
       user.resetPasswordOtpExpiry=Date.now()+10*60*1000
       await user.save()
       await sendMail(email,"Request for Reseting Password", `your otp is ${otp}`)
       res.status(200).json({success:true,message:`OTP sent to ${email}`})
      
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const resetPassword=async(req,res)=>{
    try {
        
       const {otp,newPassword}=req.body
       const user=await User.findOne({resetPasswordOtp:otp,resetPasswordOtpExpiry:{$gt:Date.now()}}).select("+password")
       if(!user){
        res.status(400).json({sucess:false,message:"Invalid OTP or OTP has been expired"})
       }
      
       user.password=newPassword
       user.resetPasswordOtp=null
       user.resetPasswordOtpExpiry=null
       await user.save()
       
       res.status(200).json({success:true,message:`Password Changed Successfully`})
      
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const addTask=async(req,res)=>{
    try {
        
       const {title,description}=req.body
       const user=await User.findById(req.user._id)
       user.task.push({title,description,completed:false,createdAt:new Date(Date.now())})
       await user.save()
       res.status(200).json({success:true,message:"Task added successfully"})
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const removeTask=async(req,res)=>{
    try {
        
       const {taskId}=req.params
       const user=await User.findById(req.user._id)
       user.task=user.task.filter(task=>task._id.toString() !== taskId.toString())
       await user.save()
       res.status(200).json({success:true,message:"Task removed successfully"})
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const updateTask=async(req,res)=>{
    try {
        const {taskId}=req.params
       const user=await User.findById(req.user._id)
       const object=user.task.find(task=>task._id.toString() === taskId.toString())
       object.completed=!object.completed
       await user.save()
       res.status(200).json({success:true,message:"Task updated successfully"})
        
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}