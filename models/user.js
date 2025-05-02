// create scheme for mongo

import mongoose from "mongoose"

 const userScheme = mongoose.Schema({
    firstName : String,
    lastName :String,
    email:String
});

export const userModel = mongoose.model('User',userScheme);

