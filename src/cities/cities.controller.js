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
