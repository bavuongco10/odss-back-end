const express = require('express');

const hotelsController = require('../hotels/hotels.controller');
const citiesController = require('../cities/cities.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};

router.get('/hotels', mockIsAuth, hotelsController.searchHotels);
router.get('/cities', mockIsAuth, citiesController.searchCities);

module.exports = router;
