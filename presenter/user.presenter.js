const normalize = (user) => {

    return {
        name: user.name,
        age: user.age,
        email: user.email,
    }
};

const normalizeAll = (users) => {
    return users.map(user => normalize(user));
};

module.exports = {
    normalize,
    normalizeAll,
};
