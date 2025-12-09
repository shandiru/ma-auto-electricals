import productModel from "../models/ProductModel.js";

// CREATE product
import multer from "multer";
import path from "path";

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, count, category } = req.body;
    const images = req.files.map((file) => `${file.filename}`);

    const product = new productModel({
      name,
      description,
      price,
      count,
      images,
      category: category || "Default", // fallback if category not provided
    });

    const savedProduct = await product.save();
    res.status(201).json({ success: true, message: "Product created", data: savedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated data
    );

    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
