const {carService} = require('../service');
const {ApiError} = require("../error");

module.exports = {
    addCar: async (req, res) => {
        try {
            const carInfo = req.carInfo;
            const userId = req.userId;
            console.log(userId);

            const car = await carService.createCar(carInfo);

            res.status(201).json(car);
        } catch (e) {
            console.log(e);
        }
    },
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findAllCars();

            if (cars.length < 1) {
                throw new ApiError('Cars not found', 404);
            }

            res.status(200).json(cars);
        } catch (e) {
            next(e);
        }
    },
    getCarById: async (req, res, next) => {
        try {
            const carId = req.carId;

            const car = await carService.findCarById(carId);

            if (!car) {
                throw new ApiError(`Car with ID: ${carId} not found`, 404);
            }

            res.status(200).json(car);
        } catch (e) {
            next(e);
        }
    },
    updateCarById: async (req, res, next) => {
        try {
            const carInfo = req.carInfo;
            const carId = req.carId;

            const car = await carService.findCarById(carId);

            if (!car) {
                throw new ApiError(`Car with ID: ${carId} not found`, 404);
            }

            const updatedCar = await carService.findUpdateCarById(carId, carInfo);

            res.status(201).json(updatedCar);
        } catch (e) {
            next(e);
        }
    },
    deleteCarById: async (req, res, next) => {
        try {
            const carId = req.carId;

            const car = await carService.findCarById(carId);

            if (!car) {
                throw new ApiError(`Car with ID: ${carId} not found`, 404);
            }

            await carService.deleteCarById(carId);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};