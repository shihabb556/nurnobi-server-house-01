import mongoose from "mongoose";

// Define House schema
const houseSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    address: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    size: { type: Number, required: true }, // Size in square feet
    realtor: { type: String, required: true },
    imageUrl: { type: String },
    isRented: { type: Boolean, default: false },
    rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    createdAt: { type: Date, default: Date.now }
});

export const House = mongoose.model("House", houseSchema);