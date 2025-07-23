const mongoose=require("mongoose")

const LoginCred=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

module.exports=mongoose.model("LoginData",LoginCred)