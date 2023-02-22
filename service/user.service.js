const {User} = require('../dataBase');
const {Types} = require('mongoose');

module.exports = {
    createUser: async (userInfo) => {
        const user = await User.create(userInfo);
        return user;
    },
    findUserById: async (userId) => {
        const user = await User.aggregate([
            {$match: {_id: Types.ObjectId(userId)}},
            {$lookup: {from: 'cars', foreignField: '_user_id', localField: '_id', as: 'cars'}},
        ]);
        return user;
    },
    // findAllUsers: async (filter = {}) => {
    //     const users = await User.find(filter).lean();
    //     return users;
    // },
    findAllUsers: async (query) => {
        const {limit = 10, page = 1, name, age} = query;

        let findObj = {};

        if (name) {
            findObj = {...findObj, name: {$regex: name}}
            // ===== or =====
            // findObj = {...findObj, name: new RegExp(name)
            // ===== or object company field name (deep search)=====
            // findObj = {...findObj, 'company.name': new RegExp(name)
        }

        if (age) {
            findObj = {...findObj, age: {$lte: +age}}
        }

        const [users, count] = await Promise.all([
            User.find(findObj).limit(limit).skip((+page - 1) * limit).lean(),
            User.count(findObj),
        ]);

        return {
            users,
            page: +page,
            count,
        };
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
