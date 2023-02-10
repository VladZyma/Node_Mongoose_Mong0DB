module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_DB: process.env.MONGO_DB || 'mongodb://localhost:27017/test',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'accessTokenSecretWord',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'wordTokenSecretRefresh',
    FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD_TOKEN_SECRET || 'forgotPasswordActionSecret',
    CONFIRM_ACCOUNT_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_TOKEN_SECRET || 'confirmAccountSecretWord',
};
