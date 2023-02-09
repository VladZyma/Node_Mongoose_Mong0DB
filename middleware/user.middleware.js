const {ApiError} = require('../error');
const {userNameNormalizer} = require('../helper');
const {userValidator, commonValidator} = require('../validator');
const {userService} = require("../service");

module.exports = {
    isNewUserBodyValid: async (req, res, next) => {
        try {
            let userInfo = req.body;

            const validate = userValidator.newUserValidator.validate(userInfo);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const normalizedUserName = userNameNormalizer.normalize(validate.value.name);

            userInfo = {...validate.value, name: normalizedUserName};

            req.userInfo = userInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUpdatingUserBodyValid: async (req, res, next) => {
        try {
            let userInfo = req.body;

            const validate = userValidator.updatingUserValidator.validate(userInfo);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const normalizedUserName = userNameNormalizer.normalize(validate.value.name);

            userInfo = {...validate.value, name: normalizedUserName};

            req.newUserInfo = userInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const validate = commonValidator.mongoIdValidator.validate(userId);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.userId = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserExistsByEmail: async (req, res, next) => {
        try {
            const {email} = req.userInfo;

            const user = await userService.findUser({email});

            if (user) {
                throw new ApiError(`User with email: ${email} already exists`, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserExistsById: async (req, res, next) => {
        try {
            const userId = req.userId;

            const user = await userService.findUserById(userId);

            if (!user) {
                throw new ApiError(`User with ID: ${userId} not found`, 404);
            }

            req.userInfo = user;
            next();
        } catch (e) {
            next(e);
        }
    },
};
