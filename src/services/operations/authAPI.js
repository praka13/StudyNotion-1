import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { useSelector } from "react-redux";




export function sendOTP(email,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",endpoints.SENDOTP_API,{email});

            if (!response.data.success) {
                throw new Error(response.data.message)
              }

            console.log(response);
            toast.success("OTP sent Successfully");
            navigate("/verify-email");

        }
        catch(err){

            console.log("SENDOTP API ERROR............", err)
            toast.error("Could Not Send OTP")

        }
        dispatch(setLoading(false));

    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,navigate
){
    console.log(accountType,firstName,lastName,email,password,confirmPassword,otp);
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",endpoints.SIGNUP_API,{   
                 accountType,
                firstName,
                lastName,
                email,
                password,confirmPassword,
                otp})

                if (!response.data.success) {
                    throw new Error(response.data.message)
                  }
            
            toast.success("Sign Up Successful");
            navigate("/login");
        }
        catch(err){
            console.log(otp);
            console.log("SENDOTP API ERROR............", err)
            toast.error("Could Hello");
            navigate("/signUp")
        }

        dispatch(setLoading(false));
    }

}

export function login(email,password,navigate){
    return async(dispatch)=>{
 
        dispatch(setLoading(true));

        try{
            const response= await apiConnector("POST",endpoints.LOGIN_API,{email,password});
            console.log(response);

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));

            const userImage=response.data?.user?.image  ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            localStorage.setItem("token",JSON.stringify(response.data.token));
            
            dispatch(setUser(response.data.user));

            localStorage.setItem("user",JSON.stringify(response.data.user));
            
            
           
            navigate("/dashboard/my-profile");
           

        }
        catch(err){
            console.log(err);
            toast.error("Login failed")

        }

        dispatch(setLoading(false));
    }

}



export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));

        try{
            const response=await apiConnector("POST",endpoints.RESETPASSTOKEN_API,{email});

            console.log("RESET PASSWORD TOKEN RESPONSE...",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");

            setEmailSent(true);

        }
        catch(err){

            console.log("RESET PASSWORD TOKEN ERROR",err);
            toast.error("Failed to sent Email")

        }
        dispatch(setLoading(false));


    }
}

export function resetPassword(password,confirmPassword,token,navigate){
    return async(dispatch)=>{

        dispatch(setLoading(true));

        try{
            const response=await apiConnector("POST",endpoints.RESETPASSWORD_API,{password,confirmPassword,token});
            console.log("RESET Password token...",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password has been reset successfully");
            navigate("/after-reset");
        }
        catch(err){

            console.log("RESET PASSWORD TOKEN ERROR",err);
            toast.error("Failed to sent Email")

        }

        dispatch(setLoading(false))

    }
}

export function logout(navigate){

  return (dispatch)=>{
    dispatch(setToken(null));
    dispatch(resetCart());
    dispatch(setUser(null));
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }

}