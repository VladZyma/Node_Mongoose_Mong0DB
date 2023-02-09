const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {config} = require('./config');
const {userRouter, carRouter} = require('./router');

const app = express();

mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/cars', carRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 5000).json({
        message: error.message,
        status: error.status,
    });
});

app.listen(config.PORT, async () => {
    await mongoose.connect(`${config.MONGO_DB}mongoDB`);
    console.log(`Listening ${config.PORT}`);
});