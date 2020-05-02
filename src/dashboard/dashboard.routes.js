const express = require('express');

const dashboardController = require('./dashboard.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};
router.get('/hotels-pivot', mockIsAuth, dashboardController.getHotelsPivot);

router.get('/ranking-hotels-pivot', mockIsAuth, dashboardController.getRankingHotelsPivot);

router.get('/features', mockIsAuth, dashboardController.getFeatures);

module.exports = router;
