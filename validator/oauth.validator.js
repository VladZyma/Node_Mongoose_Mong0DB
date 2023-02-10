const Joi = require('joi');

const {userRegexp} = require('../config');

module.exports = {
    loginBodyValidator: Joi.object({
        email: Joi.string().regex(userRegexp.EMAIL).required(),
        password: Joi.string().regex(userRegexp.PASSWORD).required(),
    }),
    emailPasswordValidator: Joi.object({
        email: Joi.string().regex(userRegexp.EMAIL).optional(),
        password: Joi.string().regex(userRegexp.PASSWORD).optional(),
    }),
};
