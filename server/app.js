import express from "express";

import User from "./routers/User.js"

export const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",User)
