import express from "express";
import {addUser, fetchUsers } from "../controller/userController.js";


const router = express.Router();

router.get('/',fetchUsers);
router.post('/addUser',addUser);


export default router;
