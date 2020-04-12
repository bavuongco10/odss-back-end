const {isEmpty, toNumber, map, get} = require('lodash');

const Cities = require('./cities.model');

exports.getCities = (req, res, next) => {
  Cities.find().then(items => {
      res.status(200).json({
        message: 'Fetched successfully.',
        items,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.searchCities = (req, res, next) => {
  const {searchText} = req.query;
  if (isEmpty(searchText)) return res.status(200).json({
    message: 'Fetched successfully.',
    items: [],
  });

  Cities.find({name: {'$regex': searchText, '$options': 'i'}}).limit(7)
    .then(items => {
      res.status(200).json({
        message: 'Fetched successfully.',
        items,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
