const express = require('express');

const rankingsController = require('./rankings.controller');

const router = express.Router();
const mockIsAuth = (req, res, next) => {next()};

router.get('/rankings', mockIsAuth, rankingsController.getRankings);
router.get('/initial-rankings', mockIsAuth, rankingsController.getInitialRankings);
router.get('/initial-cities', mockIsAuth, rankingsController.getCitiesInitial)

module.exports = router;
