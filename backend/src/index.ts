import express from "express";
import mongoose from "mongoose";
import addNewTaskRouter from "./routes/taskRoutes"
import dotenv from "dotenv";

dotenv.config()
const app = express();
const port = 3000;
mongoose.connect(process.env.DATABASE_URL || "")  //Create .env  file
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.log("Failed to connect"));
app.use(express.json());
app.listen(port, () => console.log(`Server is running on port : ${port}`));



app.use("/task", addNewTaskRouter)