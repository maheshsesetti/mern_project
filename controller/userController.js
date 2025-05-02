import { getFormattedUsers, getFormattedUsersById } from "../viewmodels/userViewModel.js";
import mongoose from 'mongoose';


export const fetchUsers = async (req, res) => {
    const { id } = req.query;
    if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'User not found' });
        }
        const formattedUser = await getFormattedUsersById(id);
        if (!formattedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user: formattedUser });
    }

    const formattedUsers = await getFormattedUsers();
    return res.json({ users: formattedUsers });
};





