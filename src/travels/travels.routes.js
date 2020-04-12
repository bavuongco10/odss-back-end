const express = require('express');

const travelsController = require('./travels.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};
router.get('/travels', mockIsAuth, travelsController.getTravels);

module.exports = router;
