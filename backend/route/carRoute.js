import express from "express";
import multer from "multer";
import { createCar, getCars, getCarById, updateCar, deleteCar } from "../controlers/carController.js";

const carRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Use .array("images") for multiple file upload
carRouter.post("/", upload.array("images", 5), createCar); // max 5 images
carRouter.get("/", getCars);
carRouter.get("/:id", getCarById);
carRouter.put("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;
