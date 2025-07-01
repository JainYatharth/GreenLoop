import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import connectDB from './config/mongodb.js';
import returnRoutes from "./routes/returnRoutes.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5001;
connectDB();

//Middleware
app.use(cors({credentials:true}));
app.use(express.json());
app.use(cookieParser());

//API endpoints
app.use("/api/auth",authRouter);
app.use("/api",returnRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});