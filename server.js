import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

//All routes imported
import authRoutes from "./src/routes/authRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import applicationRoutes from "./src/routes/applicationRoutes.js"



const app = express();
const PORT = process.env.PORT || 5000;

// Parse incoming JSON requests 
app.use(express.json());
// Enable Cross-Origin Resource Sharing
app.use(cors());

// Mount route modules with base paths
app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/applications",applicationRoutes);


// Connect to MongoDB using Mongoose
const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected sucessfully");
    
    } catch(error) {

        console.log("MongoDB connection Failed: ",error.message);
        process.exit(1);
    }
    
};

connectDB();


app.get("/",(req,res) => {

    res.send("Server is running fit and fine");
});



app.listen(PORT,() => {

    console.log(`Server is running at http://localhost:${PORT}`);
})