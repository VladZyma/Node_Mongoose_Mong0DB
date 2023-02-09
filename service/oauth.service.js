const bcrypt = require('bcrypt');

const {ApiError} = require('../error');

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
};