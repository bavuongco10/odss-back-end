const { toNumber, sumBy, size, round, first, maxBy, get } = require('lodash');
const Results = require('./results.model');
const RS = require('./RS.model');
const Rankings = require('../rankings/rankings.model');


exports.getResults = (req, res, next) => {
  const currentPage = toNumber(req.query.page) || 0;
  const currentOffset = toNumber(req.query.offset) || 10;
  let totalItems;

  Rankings.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Rankings.find()
        .skip((currentPage) * currentOffset)
        .limit(currentOffset);
    })
    .then(items => {
      res.status(200).json({
        message: 'Fetched successfully.',
        items,
        totalItems: totalItems,
        page: currentPage,
        offset: currentOffset
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getResultReviewScore = (req, res, next) => {
  const hotelId = toNumber(req.params.hotel_id);
  Rankings.find({ hotel_id: hotelId}).then(items => {
    res.status(200).json({
      message: 'Fetched successfully.',
      item: {
        review_score:  get(maxBy(items, 'Ri'), 'Ri'),
      }
    })
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.getRSResult = (req, res, next) => {
  const currentPage = toNumber(req.query.page) || 0;
  const currentOffset = toNumber(req.query.offset) || 10;
  let totalItems;

  RS.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return RS.find()
        .skip((currentPage) * currentOffset)
        .limit(currentOffset);
    })
    .then(items => {
      res.status(200).json({
        message: 'Fetched successfully.',
        items,
        totalItems: totalItems,
        page: currentPage,
        offset: currentOffset
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
