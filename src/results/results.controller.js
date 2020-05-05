const { toNumber, sumBy, size, round, first } = require('lodash');
const Results = require('./results.model');
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
  Results.find({ hotel_id: hotelId }, { _id: 1, review_score: 1, sentiment_scores: 1}).then(items => {
    const review_score_cal = round(sumBy(items, 'review_score') / size(items), 2);

    res.status(200).json({
      message: 'Fetched successfully.',
      item: {
        review_score: review_score_cal,
        sentiment_scores: first(items).sentiment_scores
      }
    })
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};
