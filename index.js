import express from "express";
import mongoose from 'mongoose';

import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./db.js";

const app = express();

const PORT = 3000;

app.use(express.json());

// db connection
connectDB();

app.use('/api/users',userRoutes);

app.listen(PORT,()=>{
    console.log(`API running at http://localhost:${PORT}`);
});