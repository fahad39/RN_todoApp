import express from "express";
import cookieParser from "cookie-parser";
import User from "./routers/User.js"
import fileUpload from "express-fileupload";
import cors from "cors"

export const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload({
    limit:{fileSize:50*1024*2000},
    useTempFiles:true
}))
app.use(cors())

app.use("/api/v1",User)
