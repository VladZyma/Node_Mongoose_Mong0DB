const {oauthValidator} = require('../validator');
const {oauthService, userService} = require('../service');
const {ApiError} = require('../error');

module.exports = {
    isLoginBodyValid: async (req, res, next) => {
        try {
            const logInfo = req.body;

            const validate = oauthValidator.loginBodyValidator.validate(logInfo);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.logInfo = logInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserEmailValid: async (req, res, next) => {
        try {
            const email = req.body;

            const validate = oauthValidator.emailPasswordValidator.validate(email);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.userEmail = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserNewPasswordValid: async (req, res, next) => {
        try {
            const password = req.body;

            const validate = oauthValidator.emailPasswordValidator.validate(password);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.userPassword = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserExistsByEmail: async (req, res, next) => {
        try {
            const {email} = req.userEmail;

            const user = await userService.findUser({email});

            if (!user) {
                throw new ApiError(`User with email: ${email} doesn't exist!`);
            }

            req.userInfo = user;
            next();
        } catch (e) {
            console.log(e);
        }
    },
    checkToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new ApiError('No access token', 401);
            }

            oauthService.checkAccessToken(token, tokenType);

            const tokenInfo = await oauthService.findAccessToken({[tokenType]: token});

            if (!tokenInfo) {
                throw new ApiError('Wrong access token', 401);
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                throw new ApiError('No action token', 404);
            }

            oauthService.checkActionToken(actionToken, actionType);

            const actionTokenInfo = await oauthService.findActionToken({actionToken});
            console.log('actionTokenInfo', actionTokenInfo);

            if (!actionTokenInfo) {
                throw new ApiError('Wrong action token', 404);
            }

            req.actionTokenInfo = actionTokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }
};