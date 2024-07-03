const express=require("express");
const router=express.Router();

const{login,signUp,sendOTP,changePassword}=require("../controllers/auth");
const{resetPasswordToken,resetPassword}=require("../controllers/resetPassword");
const {createContact}=require("../controllers/Contact");
const{auth}=require("../middlewares/auth")

router.post("/signUp",signUp);
router.post("/login",login);
router.post("/sendOTP",sendOTP);
router.post("/changePassword",auth,changePassword);

router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);
router.post("/createContact",createContact);

module.exports=router;

