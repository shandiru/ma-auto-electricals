import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Siva:Siva123@cluster0.dww1ipy.mongodb.net/MaAuto')
    .then(() => {
        console.log("Connected to MongoDB");
    })
}    