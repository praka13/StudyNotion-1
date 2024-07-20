import "./App.css";
import {Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { NavBar } from "./components/common/NavBar";
import { ForgotPassword } from "./pages/ForgotPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { AfterReset } from "./pages/AfterReset";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { DashBoard } from "./pages/DashBoard";
import { MyProfile } from "./components/DashBoard/MyProfile";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { Error } from "./pages/Error";
import { Settings } from "./components/common/Settings";
import { EnrolledCourses } from "./components/DashBoard/EnrolledCourses";
import { Cart } from "./components/DashBoard/Cart/index";
import { AddCourse } from "./components/DashBoard/AddCourse";
import { useSelector } from "react-redux";
import { MyCourses } from "./components/DashBoard/MyCourses";
import { EditCourse } from "./components/DashBoard/EditCourse";
import { Catalog } from "./pages/Catalog";
import { CourseInfo } from "./pages/CourseInfo";
import { ViewCourse } from "./pages/ViewCourse";
import { VideoDetails } from "./components/common/VideoDetails";
import { Instructor } from "./components/DashBoard/InstructorDashboard/Instructor";

function App() {
  const {user}=useSelector((state)=>state.profile);
  return (
    <div className="w-full h-full bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signUp" element={<SignUp/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/update-password/:token" element={<UpdatePassword/>}></Route>
        <Route path="/verify-email" element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path="/after-reset" element={<AfterReset/>}></Route>
        <Route path="/about" element={<AboutUs></AboutUs>}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/contact" element={<ContactUs/>}></Route>
        <Route path="/course/:courseId" element={<CourseInfo/>}></Route>
       
        <Route element={<PrivateRoute>
          <DashBoard/>
        </PrivateRoute>}>

        <Route path="/dashboard/my-profile" element={<MyProfile/>}></Route>
        <Route path="/dashboard/settings" element={<Settings/>}></Route>
        

        {
          user?.accountType==="Student" && (
            <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}></Route>
        <Route path="/dashboard/cart" element={<Cart/>}></Route>
            </>
          )
        }

        {
          user?.accountType==="Instructor" && (
           <>
              <Route path="/dashboard/add-course" element={<AddCourse/>}></Route>
              <Route path="/dashboard/my-courses" element={<MyCourses/>}></Route>
              <Route path="/dashboard/instructor" element={<Instructor/>}></Route>
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}></Route>
              </>
            
          )
        }


        </Route>

        <Route element={<PrivateRoute>
            <ViewCourse/>
        </PrivateRoute>}>

          {
            user?.accountType==="Student" && (
              <>
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails></VideoDetails>}></Route>
              </>
            )
          }

        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
