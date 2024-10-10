import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    rentedHouses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }],
    date: {
        type: Date,
        default: Date.now
    }


},{timestamps:true});
export const User = mongoose.model('User', userSchema);