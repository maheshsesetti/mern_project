import express from "express";
import { fetchUsers } from "../controller/userController.js";


const router = express.Router();

router.get('/',fetchUsers);



export default router;
