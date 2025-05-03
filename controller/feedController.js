import { getAllFeed, getFeedById, postFeed } from "../viewmodels/feedViewModel.js";

import mongoose from 'mongoose';

export const addFeed = async (req,res)=>{
    try {
        const feed = await postFeed(req.body);
        console.log(feed);
        if (!feed) {
            return res.status(400).json({ statusCode: 400, message: 'Missing fields' });
        }
        return res.status(201).json(feed);
        
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: 'Failed', message: error.message });
    }
};

export const getfeedById = async (req,res) => {
    try {
        const { id } = req.query;
        console.log(id);
        
        if(id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ statusCode: 404, message: 'Please provide valid Id' });
            }
            const feed = await getFeedById(id);
            console.log(feed);
            
            if(!feed) {
                return res.status(404).json({ statusCode: 404, message: 'Feed not found' });
            }
            return res.status(200).json(feed);
        }
        const allFeed = await getAllFeed();
        console.log(allFeed);
        return res.status(200).json(allFeed);
        
      
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: 'Failed', message: error.message })
    }
};