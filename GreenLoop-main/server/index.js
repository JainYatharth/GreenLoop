import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import connectDB from './config/mongodb.js';
import returnRoutes from "./routes/returnRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
dotenv.config();

const app=express();
const PORT=process.env.PORT || 5001;
connectDB();

//Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//API endpoints
app.use("/api/auth",authRouter);
app.use("/api",returnRoutes)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inventory", inventoryRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});