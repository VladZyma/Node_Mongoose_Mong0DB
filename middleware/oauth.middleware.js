const {oauthValidator} = require('../validator');
const {oauthService} = require('../service');
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
    // checkToken: async (req, res, next) => {
    //     try {
    //         const accessToken = req.get('Authorization');
    //
    //         if (!accessToken) {
    //             throw new ApiError('No access token', 401);
    //         }
    //
    //         oauthService.checkAccessToken(accessToken, 'accessToken');
    //
    //         const token = await oauthService.findAccessToken({accessToken});
    //
    //         if (!token) {
    //             throw new ApiError('Wrong access token', 401);
    //         }
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },
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
};