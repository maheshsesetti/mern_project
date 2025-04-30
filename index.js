import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/api/users',userRoutes);

app.listen(PORT,()=>{
    console.log(`API running at http://localhost:${PORT}`);
});