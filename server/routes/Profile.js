const express=require("express");
const router=express.Router();
const { auth } = require("../middlewares/auth");

const {updateProfile,deleteAccount,getAllUserDetails,getEnrolledCourses,updateDisplayPicture}=require("../controllers/Profile");

router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/getUserDetails",auth,getAllUserDetails);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.post("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports=router;