import express from "express";
import cookieParser from "cookie-parser";
import User from "./routers/User.js"

export const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/v1",User)
