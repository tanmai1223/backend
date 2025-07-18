const mongoose=require("mongoose");

const authSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minLength:8
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:new Date().toISOString()
    }
})

const AuthUser=mongoose.model("AuthUser",authSchema)

module.exports=AuthUser