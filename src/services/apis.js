

const BASE_URL="https://studynotion-backend-ldqt.onrender.com/api/v1";


// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    CONTACT_US_API: BASE_URL + "/auth/createContact",
  }

  export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_USER_ENROLLED_COURSES_API2: BASE_URL + "/profile/getEnrolledCourses2"
  }

  export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  }
// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    COURSE_DETAILS_API2: BASE_URL + "/course/getCourseDetails2",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategory",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/createSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourseDetails",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    EDIT_COURSE_STATUS:BASE_URL+"/course/editCourseStatus",
    
  }
  
  // RATINGS AND REVIEWS
  export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
  }
  
  // CATAGORIES API
  export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategory",
  }
  
  // CATALOG PAGE DATA
  export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
  }

  
  
  // SETTINGS PAGE API
  export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
    INSTRUCTOR_DASHBOARD:BASE_URL+"/profile/instructorDashboard"
  }

  export const courseProgressEndPoints={
    CREATE_COURSE_PROGRESS_API:BASE_URL+"/courseProgress/createCourseProgress",
    ADD_SUB_SECTION:BASE_URL+"/courseProgress/addSubSection",
    FIND_COURSE_PROGRESS:BASE_URL+"/courseProgress/findCourseProgress"
  }