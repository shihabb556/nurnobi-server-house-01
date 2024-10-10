import mongoose from "mongoose";

const rentSchema = new mongoose.Schema({
    house: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House', // reference to the House model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // reference to the User model
      required: true,
    },
    rentStartDate: {
      type: Date,
      required: true,
    },
    rentEndDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'ended'],
      default: 'active',
    },
  });
  
 export const Rent = mongoose.model('Rent', rentSchema);