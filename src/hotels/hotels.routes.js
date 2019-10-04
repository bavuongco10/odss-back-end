const express = require('express');

const hotelsController = require('./hotels.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};
router.get('/hotels', mockIsAuth, hotelsController.getHotelsByCity);

module.exports = router;
