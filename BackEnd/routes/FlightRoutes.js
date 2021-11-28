const express=require('express');
const { models } = require('mongoose');
const flightController = require('../Controller/flightController');
const flightRouter = express.Router();
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended: false}));

flightRouter.get('/getAllFlights',flightController.getAllFlights);

module.exports = flightRouter;