import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  year: { type: Number, required: true },
  model: { type: String, required: true },
    
});

const carModel = mongoose.models.car || mongoose.model("car", carSchema);

export default carModel;
