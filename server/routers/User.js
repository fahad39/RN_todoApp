import express from "express";
import { login, logout, register, verify } from "../controllers/User.js";
import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

router.route("/register").post(register)
router.route("/verify").post( isAuthenticated,verify)
router.route("/login").post(login)
router.route("/logout").get(logout)



export default router;