const {carValidator, commonValidator} = require('../validator');
const {ApiError} = require('../error');

module.exports = {
    isNewCarBodyValid: async (req, res, next) => {
        try {
            const carInfo = req.body;

            const validate = carValidator.newCarValidator.validate(carInfo);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.carInfo = validate.value;
            req.userId = validate.value._user_id;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUpdatingCarBodyValid: async (req, res, next) => {
        try {
            const carInfo = req.body;

            const validate = carValidator.updatingCarValidator.validate(carInfo);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.carInfo = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isCarIdValid: async (req, res, next) => {
        try {
            const {carId} = req.params;

            const validate = commonValidator.mongoIdValidator.validate(carId);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.carId = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
