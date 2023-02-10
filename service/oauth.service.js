const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth, ActionToken} = require('../dataBase');
const {ApiError} = require('../error');
const {config, tokenAction} = require('../config');

module.exports = {
    hashPassword: async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    },
    comparePasswords: async (password, hashedPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 401);
        }
    },

    generateAccessTokens: (dataTiSign) => {
        const accessToken = jwt.sign(dataTiSign, config.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
        const refreshToken = jwt.sign(dataTiSign, config.REFRESH_TOKEN_SECRET, {expiresIn: '60s'});

        return {
            accessToken,
            refreshToken,
        }
    },
    checkAccessToken: (token, tokenType) => {
        try {
            let secret = '';

            switch (tokenType) {
                case 'accessToken':
                    secret = config.ACCESS_TOKEN_SECRET;
                    break;
                case 'refreshToken':
                    secret = config.REFRESH_TOKEN_SECRET;
                    break;
            }

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Access token has expired', 401);
        }
    },
    addTokensToBase: async (tokenInfo) => {
        const tokens = await OAuth.create(tokenInfo);
        return tokens;
    },
    findAccessToken: async (tokenInfo) => {
        const token = await OAuth.findOne(tokenInfo);
        return token;
    },
    deleteAccessTokensById: async (tokenId) => {
        await OAuth.findByIdAndDelete(tokenId);
    },
    deleteManyAccessTokens: async (filter) => {
        await OAuth.deleteMany(filter);
    },

    generateActionToken: (actionType, dataToSign) => {
        let secret = '';

        switch (actionType) {
            case tokenAction.CONFIRM_ACCOUNT:
                secret = config.CONFIRM_ACCOUNT_TOKEN_SECRET;
                break;
            case tokenAction.FORGOT_PASSWORD:
                secret = config.FORGOT_PASSWORD_TOKEN_SECRET;
                break;
        }

        const actionToken = jwt.sign(dataToSign, secret, {expiresIn: '60s'});

        return actionToken;
    },
    checkActionToken: (token, actionType) => {
        try {
            let secret = '';

            switch (actionType) {
                case tokenAction.CONFIRM_ACCOUNT:
                    secret = config.CONFIRM_ACCOUNT_TOKEN_SECRET;
                    break;
                case tokenAction.FORGOT_PASSWORD:
                    secret = config.FORGOT_PASSWORD_TOKEN_SECRET;
                    break;
            }

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Wrong action token', 401);
        }
},
    addActionTokenToBase: async (token) => {
        const tokenInfo = await ActionToken.create(token);
        return tokenInfo;
    },
    findActionToken: async (tokenInfo) => {
        const token = await ActionToken.findOne(tokenInfo);
        return token;
    },
    deleteActionTokenById: async (tokenId) => {
        await ActionToken.findByIdAndDelete(tokenId);
    },

};