const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const mongoose=require("mongoose");
require("dotenv").config()
const {courseEnrollmentEMail}=require("../mail/courseEnrollmentEmail");
const crypto=require("crypto");


//capture the payment and initiate the Razorpay order

exports.capturePayment=async(req,res)=>{

    const {courses}=req.body;
    const userId=req.user.id;

    if(courses.length===0){
        return res.status(400).json({
            success:false,
            message:"Please Provide Course Id"
        })
    }

    let totalAmount=0;

    for(const course_id of courses){
        let course;


        try{
            course=await Course.findById(course_id);
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:"Course Not Found"
                })
            }

            //const uid=new mongoose.ObjectId(userId);

            if(course.studentsEnrolled.includes(userId)){
                //toast.error("Student is already Enrolled")
                return res.status(400).json({
                    success:false,
                    message:"Students is Already enrolled"
                })
            }

            totalAmount+=course.price;

        }
        catch(err){

            console.log(err);
            return res.status(500).json({
                success:false,
                message:err.message
            })

        }

    }

    const options={
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }

    try{

        const paymentResponse=await instance.orders.create(options);

        res.json({
            success:true,
            message:paymentResponse,
        })

    }
    catch(err){

        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Could not initiate order"
        })

    }

}

exports.verifyPayment=async(req,res)=>{

    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body?.courses;
    const userId=req.user.id;

    if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature||!courses||!userId){
        return res.status(400).json({
            success:false,
            message:"Payment failed"

        })
    }

    let body=razorpay_order_id + "|" +razorpay_payment_id;

    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if(expectedSignature===razorpay_signature){
        //enroll the student in the course

        await enrollStudent(courses,userId,res)



        //return res
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }

    return res.status(400).json({
        success:false,
        message:"Payment Failed"
    })

}

const enrollStudent=async(courses,userId,res)=>{

    if(!courses||!userId){
        return res.status(400).json({
            success:false,
            message:"Please Provide data for courses or userId"
        })
    }

    for(const courseId of courses){
        try{
            const enrolledCourses=await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true},
            )
    
            if(!enrolledCourses){
                return res.status(500).json({
                    success:false,
                    message:"Course Not Found"
                })
            }
    
             //find the student and add the course to the student list
            const enrolledStudent=await User.findByIdAndUpdate(userId,
                {$push:{
                    courses:courseId
                }},{new:true})
    
                
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:err
            })
        }
    }

}


exports.sendPaymentSuccessEmail=async(req,res)=>{
    const {orderId,paymentId,amount}=req.body;

    const userId=req.user.id;

    if(!orderId||!paymentId||!amount||!userId){
        return res.status(400).json({
            success:false,
            message:"Please provide all the details"
        })
    }

    try{

        const enrolledStudent=await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            `${enrolledStudent.firstName} thank you for enrollment`
        )

    }

    catch(err){

        console.log("error in sending mail",err);
        return res.status(500).json({
            success:false,
            message:"Could not send mail"
        }) 

    }
}




// exports.capturePayment=async(req,res)=>{
//     //get courseId and userId
//     const{courseId}=req.body;
//     const userId=req.user.id;
//     //validation    //valid CourseId
//     if(!courseId||!userId){
//         return res.json({
//             success:false,
//             message:"Please provide valid courseId"
//         })
//     }

//     //valid courseDetails
//     let course;
//     try{

//         course=await Course.findById(courseId);
//         if(!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"Course not found",
//             })
//         }

//         //user already pay for the course
//          const uid=new mongoose.ObjectId(userId);

//         //  const uid=course.studentsEnrolled.findById(userId);
        
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student is already registered"
//             })
//         }

//     }
//     catch(err){
//         console.error(err);
//         return res.status(500).json({
//             success:false,
//             message:err.message,
//         });

//     }
   
//     //order create

//     const amount=course.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:courseId,
//             userId,
//         }
//     };

//     //initiate the payment using razorpay

//     try{
//         const paymentResponse=await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbNail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,


//         })

//     }
//     catch(err){
//         console.log(err);
//         return res.json({
//             success:false,
//             message:"Could not initiate order"
//         })

//     }
//     //return response

// };


// exports.verifySignature=async(req,res)=>{
//     const webhookSecret="1234567";

//     const signature=req.headers("x-razorpay-signature");

//     const shasum=crypto.createHmac("sha256",webhookSecret);

//     shasum.update(JSON.stringify(req.body));

//     const digest=shasum.digest("hex");


//     if(signature===digest){
//         console.log("Payment is authorized");

//         const{courseId,userId}=req.body.payload.payment.entity.notes;

//         try{

//             //find the course and enroll the student
            
//             const enrollCourse=await Course.findOneAndUpdate(
//                                                             {_id:courseId},
//                                                             {$push:{studentsEnrolled:userId}},
//                                                             {new:true}                                  
//             );
//             if(!enrollCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found"
//                 }) 
//             }
//             console.log(enrollCourse);

//             //find the student and add the course to it

//             const enrolledStudent=await User.findOneAndUpdate(
//                                                                 {_id:userId},
//                                                                 {$push:{courses:courseId}},
//                                                                 {new:true}
//             )

//             console.log(enrolledStudent);

//             //mail send

//             const emailResponse=await mailSender(
//              enrolledStudent.email,"congralutions your are enrolled","Please start your new journey to coding"
//             )

//             console.log(emailResponse);

//             return res.status(200).json({
//                 success:true,
//                 message:"You have been enrolled successfully"
//             })

//         }
//         catch(err){
//             console.log(err);
//             return res.status(500).json({
//                 success:false,
//                 message:err.message,
//             })

//         }


//     }

//     else{

//         return res.status(400).json({
//             success:false,
//             message:"Secrets don't match"
//         })

//     }
// }

