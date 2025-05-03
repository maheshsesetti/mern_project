// create scheme for mongo

import mongoose from "mongoose"

 const userScheme = mongoose.Schema({
    firstName : {type:String,required:true},
    lastName :{type:String,required:true},
    email:{type:String,required:true},
    fullName:{type:String},
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date,default: Date.now}
});

export const userModel = mongoose.model('User',userScheme);






