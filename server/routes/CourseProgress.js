const express=require("express");
const router=express.Router();

const {createCourseProgress,addSubSection, findCourseProgress}=require("../controllers/CourseProgress");
const { isStudent, auth } = require("../middlewares/auth");

router.post("/createCourseProgress",auth,isStudent,createCourseProgress);
router.post("/addSubSection",auth,isStudent,addSubSection);
router.post("/findCourseProgress",auth,isStudent,findCourseProgress);

module.exports=router;