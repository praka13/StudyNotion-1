const express=require("express");
const router=express.Router();
const { auth, isInstructor } = require("../middlewares/auth");

const {updateProfile,deleteAccount,getAllUserDetails,getEnrolledCourses,updateDisplayPicture,getEnrolledCourses2,instructorDashboard}=require("../controllers/Profile");

router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/getUserDetails",auth,getAllUserDetails);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/getEnrolledCourses2",auth,getEnrolledCourses2);
router.post("/updateDisplayPicture",auth,updateDisplayPicture);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);

module.exports=router;