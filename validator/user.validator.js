const Joi = require('joi');

const {userRegexp} = require('../config');

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().regex(userRegexp.NAME).required(),
        age: Joi.number().integer().min(1).max(130).required(),
        email: Joi.string().regex(userRegexp.EMAIL).required(),
        password: Joi.string().regex(userRegexp.PASSWORD).required(),
    }),
    updatingUserValidator: Joi.object({
        name: Joi.string().regex(userRegexp.NAME).optional(),
        age: Joi.number().integer().min(1).max(130).optional(),
        email: Joi.string().regex(userRegexp.EMAIL).optional(),
    }),
};
