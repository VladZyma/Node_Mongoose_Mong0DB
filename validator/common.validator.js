const Joi = require('joi');

const {mongoIdRegexp} = require('../config');

module.exports = {
    mongoIdValidator: Joi.string().regex(mongoIdRegexp.MONGO_ID),
};