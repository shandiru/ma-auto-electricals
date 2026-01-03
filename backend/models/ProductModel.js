import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  count: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
