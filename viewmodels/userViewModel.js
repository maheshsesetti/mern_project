import { userModel } from "../models/user.js";
import { getUserById, getUsers } from "../models/userModel.js";

// To view the model responses

export const getFormattedUsers = async () => {
    // const users = getUsers();
    const users = await userModel.find();


    return users.map((e) => ({
        id: e._id,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email
    }));
};


export const getFormattedUsersById = async (id) => {
    // const user = getUserById(id);
    const user = await userModel.findById(id);
    console.log(user);

    if (!user) return null;
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email

    };
};


export const postUser = async (data) => {
    const { firstName, lastName, email } = data;
    if (!firstName || !lastName || !email) return null;

    let user = await userModel.findOne({ firstName, lastName, email });
    console.log(user);

    if (user) {
        return {
            statusCode: 200, message: 'User Already Exists',
            data: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                createdAt: user.createdAt
            }

        };
    }
    user = await userModel.create(data);
    console.log(user);
    return {
        statusCode: 201, message: 'User Created Successfully',
        data: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            createdAt: user.createdAt

        }
    };
};