const mongoose = require("mongoose")
const {Schema , model} = mongoose
//Schema
const UserSchema = new Schema({
    name:{type:String , require: true},
    email:{type:String , require: true , trim:true , minLength:3 , unique: true},
    password:{type:String , require: true , select: false , minLength:8},
    photo:{type:String , require: true},
    role:{type:String , require: true , enum:["admin" , "user"] , default:"user"},
},
    {
    timestamps:true,
    }
)
const UserModel = model("User", UserSchema)
module.exports = UserModel