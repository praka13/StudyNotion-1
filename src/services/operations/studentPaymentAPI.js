import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

import rzpLogo from "../../assets/Logo/Logo-Small-Light.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
//import { verifyPayment } from "../../../server/controllers/Payments";


const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");

        script.src=src;

        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token,courses,userDetails,navigate,dispatch){
  

    try{
        //load the script

        const res= await loadScript("https://checkout.razorpay.com/v1/checkout.js") ;

        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        //initiate the order

        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,
                                                                {courses},
                                                                {
                                                                    Authorisation:`Bearer ${token}`,
                                                                })

        console.log(orderResponse);

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message); 
        }

        //options

        const options={
            key:"rzp_test_AsaaOEqahJW46i",
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thank you for purchasing the Course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function(response){
                //send successful mail

                alert(console.log("Hello"));

                console.log(response);

                sendPaymentSuccessMail(response,orderResponse.data.message.amount,token);

                //verifyPayment

                verifyPayment({...response,courses},token,navigate,dispatch);
            }

        }

        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("oops,payment failed");
            
        })

        console.log(options);

        toast.success("Moved to next Step");

    }
    catch(err){

        console.log("Payment API Error");
        console.log(err);
        toast.error("Could not make payment")

    }
}

async function sendPaymentSuccessMail(response,amount,token){
    try{
        const respons=await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,

        },{
            Authorisation:`Bearer ${token}`
        })

        console.log(respons);

        toast.success("Mail Sent Successfully");


    }
    catch(err){

        console.log(err);

    }
}

//verify payment

async function verifyPayment(bodyData,token,navigate,dispatch){
    
    //dispatch(setPaymentLoading(true));

    try{
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorisation:`Bearer ${token}`,
        })

        if(!response){
            throw new Error(response.data.message);
        }

        toast.success("PayMent SuccessFull");
        navigate("/dashboard/enrolled-courses");
        
        dispatch(resetCart());
    }
    catch(err){

        console.log("PAYMENT VERIFY ERROR....",err);
        toast.error("Could not verify payment");



    }

   
    //dispatch(setPaymentLoading(false))
}