const express = require('express');

const resultsController = require('./results.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};
router.get('/results', mockIsAuth, resultsController.getResults);
router.get('/rs-results', mockIsAuth, resultsController.getRSResult);
router.get('/hotels/:hotel_id/results', mockIsAuth, resultsController.getResultReviewScore);

module.exports = router;
