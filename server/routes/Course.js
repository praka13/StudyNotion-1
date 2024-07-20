const express=require("express");
const router=express.Router();

const {createCourse,showAllCourses,getCourseDetails,editCourse,editCourseStatus,getInstructorCourseDetails,deleteCourse,getCourseDetails2,getFullCourseDetails}=require("../controllers/Course");

const {createSection,updateSection,deleteSection}=require("../controllers/Section");

const {createSubSection,updateSubSection,deleteSubSection}=require("../controllers/SubSection");
const{createCategory,showAllCategory,categoryPage}=require("../controllers/Category");

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");
const {createRating,getAverageRating,getAllRatingAndReviews} = require("../controllers/RatingAndReview")

router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/createSection",auth,isInstructor,createSection);
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.post("/editCourse",auth,isInstructor,editCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetails",getCourseDetails);
router.post("/getCourseDetails2",getCourseDetails2);
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategory", showAllCategory);
router.post("/getCategoryPageDetails", categoryPage);
router.post("/createRating",auth,isStudent,createRating);
router.post("/editCourseStatus",auth,isInstructor,editCourseStatus);
router.post("/getInstructorCourseDetails",auth,isInstructor,getInstructorCourseDetails);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);
router.post("/getFullCourseDetails",auth,isStudent,getFullCourseDetails);

router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingAndReviews)

module.exports = router

