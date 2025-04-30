import { getFormattedUsers, getFormattedUsersById } from "../viewmodels/userViewModel.js";

export const fetchUsers = (req, res) => {
    const { id } = req.query;

    if (id) {
        const formattedUser = getFormattedUsersById(id);
        if (!formattedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user: formattedUser });
    }

    const formattedUsers = getFormattedUsers();
    res.json({ users: formattedUsers });
};

