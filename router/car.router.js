const router = require('express').Router();

const {carMiddleware, userMiddleware} = require('../middleware');
const {carController} = require('../controller');

router.get(
    '/',
    carController.getAllCars,
);
router.post(
    '/',
    carMiddleware.isNewCarBodyValid,
    userMiddleware.isUserExistsById,
    carController.addCar,
);

router.get(
    '/:carId',
    carMiddleware.isCarIdValid,
    carController.getCarById,
);
router.put(
    '/:carId',
    carMiddleware.isCarIdValid,
    carMiddleware.isUpdatingCarBodyValid,
    carController.updateCarById,
);
router.delete(
    '/:carId',
    carMiddleware.isCarIdValid,
    carController.deleteCarById,
);

module.exports = router;