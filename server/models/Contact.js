const mongoose=require("mongoose");

const contactSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
        requird:true
    },
    countryCode:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("Contact",contactSchema);