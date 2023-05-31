import mongoose from "mongoose";

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
    otp:Number,
    otp_expiry:Date
})

export const User=mongoose.model("todo_app_user",userSchema)