import express from "express";
import { register, verify } from "../controllers/User.js";
import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

router.route("/register").post(register)
router.route("/verify").post( isAuthenticated,verify)



export default router;