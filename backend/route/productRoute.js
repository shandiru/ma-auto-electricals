import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controlers/productController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
const productRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// For image uploads
productRouter.post("/", upload.array("images", 5), createProduct);

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", upload.array("images", 5), updateProduct);
//productRouter.delete("/:id", deleteProduct);
productRouter.delete("/:id", authMiddleware, deleteProduct);

export default productRouter;
