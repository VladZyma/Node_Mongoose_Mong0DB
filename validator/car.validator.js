const Joi = require('joi');

const {carRegexp, mongoIdRegexp} = require('../config');

module.exports = {
    newCarValidator: Joi.object({
        producer: Joi.string().regex(carRegexp.PRODUCER).required(),
        model: Joi.string().regex(carRegexp.MODEL).required(),
        year: Joi.number().min(1960).max(new Date().getFullYear()).required(),
        _user_id: Joi.string().regex(mongoIdRegexp.MONGO_ID).required(),
    }),
    updatingCarValidator: Joi.object({
        producer: Joi.string().regex(carRegexp.PRODUCER).optional(),
        model: Joi.string().regex(carRegexp.MODEL).optional(),
        year: Joi.number().min(1960).max(new Date().getFullYear()).optional(),
    }),
};
