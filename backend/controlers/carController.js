import carModel from "../models/CarModel.js";

// CREATE car
export const createCar = async (req, res) => {
  try {
    const car = new carModel(req.body);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all cars
export const getCars = async (req, res) => {
  try {
    const cars = await carModel.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);

    if (!car) return res.status(404).json({ error: "Car not found" });

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE car
export const updateCar = async (req, res) => {
  try {
    const updatedCar = await carModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCar)
      return res.status(404).json({ error: "Car not found" });

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE car
export const deleteCar = async (req, res) => {
  try {
    const deletedCar = await carModel.findByIdAndDelete(req.params.id);

    if (!deletedCar)
      return res.status(404).json({ error: "Car not found" });

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
