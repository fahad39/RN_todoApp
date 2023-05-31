import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minilength:[8,"Password must be 9 characters long"],
        select:false
    },
    avatar:{
        public_id:String,
        url:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()

    },
    task:[{
        title:String,
        description:"string",
        completed:Boolean,
        createdAt:Date
    }],
    verified:{
        type:Boolean,
        default:false,
    },
    otp:Number,
    otp_expiry:Date
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(this.password,salt)
    this.password=hashedPassword;
    next()
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_COOKIE_EXPIRE
    })

}

export const User=mongoose.model("todo_app_user",userSchema)