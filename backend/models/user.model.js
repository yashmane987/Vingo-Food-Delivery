import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{ typeof:String , require:true},
    email:{ typeof:String , require:true , unique:true},
    password:{ typeof:String },
     mobileNo:{ typeof:String ,require:true},
     role:{typeof:String, enum:["user","owener","deliveryBoy"], require:true}
},{timestamps:true})

const User =mongoose.model('User',userSchema)
export default User