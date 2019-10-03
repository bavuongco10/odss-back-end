const express = require('express');

const resultsController = require('./results.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};
router.get('/results', mockIsAuth, resultsController.getResults);

module.exports = router;
