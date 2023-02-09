const {User} = require('../dataBase');

module.exports = {
    createUser: async (userInfo) => {
        const user = await User.create(userInfo);
        return user;
    },
    findUserById: async (userId) => {
        const user = User.findById(userId).lean();
        return user;
    },
    findAllUsers: async (filter = {}) => {
        const users = await User.find(filter).lean();
        return users;
    },
    findUser: async (filter) => {
        const user = await User.findOne(filter).lean();
        return user;
    },
    findUpdateById: async (userId, userInfo) => {
        const user = await User.findByIdAndUpdate(userId, userInfo, {new: true}).lean();
        return user;
    },
    findDeleteById: async (userId) => {
        await User.findByIdAndDelete(userId);
    },
};
