const express = require('express');

const citiesController = require('./cities.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};
router.get('/cities', mockIsAuth, citiesController.getCities);

module.exports = router;
