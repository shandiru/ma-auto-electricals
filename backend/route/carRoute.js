import express from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controlers/carController.js";

const carRouter = express.Router();

carRouter.post("/", createCar);
carRouter.get("/", getCars);
carRouter.get("/:id", getCarById);
carRouter.put("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;
