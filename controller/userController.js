import { getFormattedUsers, getFormattedUsersById, postUser } from "../viewmodels/userViewModel.js";
import mongoose from 'mongoose';


export const fetchUsers = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ statusCode: 404, message: 'Please provide valid Id' });
            }
            const formattedUser = await getFormattedUsersById(id);
            if (!formattedUser) {
                return res.status(404).json({ statusCode: 404, message: 'User not found' });
            }
            return res.json({ statusCode: 200, message: 'Success', user: formattedUser });
        }

        const formattedUsers = await getFormattedUsers();
        return res.json({ statusCode: 200, message: 'Success', users: formattedUsers });
    } catch (error) {
        return res.json({ statusCode: 500, message: 'Failed', message: error.message });
    }
};


export const addUser = async (req, res) => {
    try {
        const user = await postUser(req.body);
        console.log(user);
        
        if (!user) {
            return res.status(400).json({ statusCode: 400, message: 'Missing fields' });
        }
        let status = user.message === 'User Already Exists' ? 200: 201
        return res.status(status).json(user);
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: 'Failed', message: error.message });
    }
};





