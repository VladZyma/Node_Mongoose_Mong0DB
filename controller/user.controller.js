const {userService, oauthService} = require('../service');
const {ApiError} = require("../error");

module.exports = {
    register: async (req, res) => {
        try {
            let userInfo = req.userInfo;

            const hashedPassword = await oauthService.hashPassword(userInfo.password);

            userInfo = {...userInfo, password: hashedPassword};

            const user = await userService.createUser(userInfo);

            res.status(201).json(user);
        } catch (e) {
            console.log(e);
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            if (users.length < 1) {
                throw new ApiError('Users not found', 404);
            }

            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = req.userInfo;

            res.status(200).json(user);
        } catch (e) {
            console.log(e);
        }
    },
    updateUserById: async (req, res) => {
        try {
            const userInfo = req.newUserInfo;
            const {userId} = req.params;
            console.log(userInfo);

            const updatedUser = await userService.findUpdateById(userId, userInfo);

            res.status(201).json(updatedUser);
        } catch (e) {
            console.log(e);
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const {userId} = req.params;

            await userService.findDeleteById(userId);

            res.sendStatus(204);
        } catch (e) {
            console.log(e);
        }
    }
};
