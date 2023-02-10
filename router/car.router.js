const router = require('express').Router();

const {carMiddleware, userMiddleware, oauthMiddleware} = require('../middleware');
const {carController} = require('../controller');

router.get(
    '/',
    oauthMiddleware.checkToken,
    carController.getAllCars,
);
router.post(
    '/',
    oauthMiddleware.checkToken,
    carMiddleware.isNewCarBodyValid,
    userMiddleware.isUserExistsById,
    carController.addCar,
);

router.get(
    '/:carId',
    oauthMiddleware.checkToken,
    carMiddleware.isCarIdValid,
    carController.getCarById,
);
router.put(
    '/:carId',
    oauthMiddleware.checkToken,
    carMiddleware.isCarIdValid,
    carMiddleware.isUpdatingCarBodyValid,
    carController.updateCarById,
);
router.delete(
    '/:carId',
    oauthMiddleware.checkToken,
    carMiddleware.isCarIdValid,
    carController.deleteCarById,
);

module.exports = router;