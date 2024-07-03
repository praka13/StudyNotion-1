const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const mongoose=require("mongoose");
const {courseEnrollmentMail}=require("../mail/courseEnrollmentEmail");

//capture the payment and initiate the Razorpay order

exports.capturePayment=async(req,res)=>{
    //get courseId and userId
    const{courseId}=req.body;
    const userId=req.user.id;
    //validation    //valid CourseId
    if(!courseId||!userId){
        return res.json({
            success:false,
            message:"Please provide valid courseId"
        })
    }

    //valid courseDetails
    let course;
    try{

        course=await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Course not found",
            })
        }

        //user already pay for the course
         const uid=new mongoose.ObjectId(userId);

        //  const uid=course.studentsEnrolled.findById(userId);
        
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already registered"
            })
        }

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:err.message,
        });

    }
   
    //order create

    const amount=course.price;
    const currency="INR";

    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:courseId,
            userId,
        }
    };

    //initiate the payment using razorpay

    try{
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbNail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,


        })

    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"Could not initiate order"
        })

    }
    //return response

};


exports.verifySignature=async(req,res)=>{
    const webhookSecret="1234567";

    const signature=req.headers("x-razorpay-signature");

    const shasum=crypto.createHmac("sha256",webhookSecret);

    shasum.update(JSON.stringify(req.body));

    const digest=shasum.digest("hex");


    if(signature===digest){
        console.log("Payment is authorized");

        const{courseId,userId}=req.body.payload.payment.entity.notes;

        try{

            //find the course and enroll the student
            
            const enrollCourse=await Course.findOneAndUpdate(
                                                            {_id:courseId},
                                                            {$push:{studentsEnrolled:userId}},
                                                            {new:true}                                  
            );
            if(!enrollCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                }) 
            }
            console.log(enrollCourse);

            //find the student and add the course to it

            const enrolledStudent=await User.findOneAndUpdate(
                                                                {_id:userId},
                                                                {$push:{courses:courseId}},
                                                                {new:true}
            )

            console.log(enrolledStudent);

            //mail send

            const emailResponse=await mailSender(
             enrolledStudent.email,"congralutions your are enrolled","Please start your new journey to coding"
            )

            console.log(emailResponse);

            return res.status(200).json({
                success:true,
                message:"You have been enrolled successfully"
            })

        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:err.message,
            })

        }


    }

    else{

        return res.status(400).json({
            success:false,
            message:"Secrets don't match"
        })

    }
}
