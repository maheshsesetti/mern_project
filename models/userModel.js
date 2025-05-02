export const users = () => {
    return [
        { id: 1, firstName: 'Alice', lastName: 'Smith', },
        { id: 2, firstName: 'Bob', lastName: 'Johnson' }
    ];
};

export const getUsers = () => users();

export const getUserById = (id) => users().find((user) => user.id === parseInt(id));




