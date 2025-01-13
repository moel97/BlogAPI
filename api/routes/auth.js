import express from "express"
import { changePassword, registerUser, userLogin, userLogout } from "../Component/auth.js";

let router = express.Router();

router.post("/register",registerUser);

router.post("/login",userLogin);

router.post("/logout",userLogout);

router.post("/forgotpassword",changePassword);

export default router