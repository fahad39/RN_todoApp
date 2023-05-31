import { now } from "mongoose";
import { User } from "../models/user.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        // const {avatar}=req.files
        let user= await User.findOne({email})
        console.log("user found",user)
        if(user){
            return res
                .status(400)
                .json({
                    success:false,
                    message:"User already exists"
                })
        }
        const otp=Math.floor(Math.random()*1000000)
        user=await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:"",
                url:""
            },
            otp,
            otp_expiry:new Date(Date.now()+process.env.OTP_EXPIRE*60*1000)
        })

        await sendMail(email,"Verify your account",`Your OTP is ${otp}`)
        sendToken(res,user,200,"OTP sent to your email, Please verify your account")
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}