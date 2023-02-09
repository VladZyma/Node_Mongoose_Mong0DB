const {Car} = require('../dataBase');

module.exports = {
    createCar: async (carInfo) => {
        const car = Car.create(carInfo);
        return car;
    },
    findAllCars: async (filter = {}) => {
        const cars = await Car.find(filter).lean();
        return cars;
    },
    findCarById: async (carId) => {
        const car = await Car.findById(carId).lean();
        return car;
    },
    findUpdateCarById: async (carId, carInfo) => {
        const car = await Car.findByIdAndUpdate(carId, carInfo, {new: true}).lean();
        return car;
    },
    deleteCarById: async (carId) => {
        await Car.findByIdAndDelete(carId);
    },
};
