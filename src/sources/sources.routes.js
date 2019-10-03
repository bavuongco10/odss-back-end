const express = require('express');

const sourcesController = require('./sources.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};
router.get('/sources', mockIsAuth, sourcesController.getSources);

module.exports = router;
