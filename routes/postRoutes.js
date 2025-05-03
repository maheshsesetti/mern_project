import express from "express";
import { addFeed,getfeedById } from "../controller/feedController.js";

const postRouter = express.Router();

postRouter.post('/postFeed',addFeed);
postRouter.get('/',getfeedById);
export default postRouter;