import { getUserById, getUsers } from "../models/userModel.js";

export const getFormattedUsers = () => {
    const users = getUsers();    
    return users.map((e) => ({
        id: e.id,
        fullName: `${e.firstName} ${e.lastName}`
    }));
};


export const getFormattedUsersById = (id) => {
    const user = getUserById(id);
    if(!user) return null;
    return {
        id:user.id,
        fullName:`${user.firstName} ${user.lastName}`
    };
};