const {oauthService, userService} = require('../service');
const {ApiError} = require('../error');

module.exports = {
    login: async (req, res, next) => {
        try {
            const logInfo = req.logInfo;

            const user = await userService.findUser({email: logInfo.email});

            if (!user) {
                throw new ApiError(`User with email: ${logInfo.email} not found`, 404);
            }

            await oauthService.comparePasswords(logInfo.password, user.password);

            const tokenPair = oauthService.generateAccessTokens({id: user._id});

            await oauthService.addTokensToBase({_user_id: user._id, ...tokenPair});

            res.status(200).json({user, ...tokenPair});
        }
         catch (e) {
            next(e);
        }
    },
    refresh: async (req, res ,next) => {
        try {
            const tokenInfo = req.tokenInfo;

            const tokenPair = oauthService.generateAccessTokens({id: tokenInfo._user_id});

            await oauthService.deleteAccessTokensById(tokenInfo._id);

            await oauthService.addTokensToBase({_user_id: tokenInfo._user_id, ...tokenPair});

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res) => {
        try {
            const tokenInfo = req.tokenInfo;

            await oauthService.deleteAccessTokensById(tokenInfo._id);

            res.sendStatus(204);
        } catch (e) {
            console.log(e);
        }
    },
    logoutAll: async (req, res) => {
        try {
            const tokenInfo = req.tokenInfo;

            await oauthService.deleteManyAccessTokens({_id: tokenInfo._id});

            res.sendStatus(204);
        } catch (e) {
            console.log(e);
        }
    },
};
