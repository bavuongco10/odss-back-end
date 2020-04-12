const Travels = require('./travels.model');

exports.getTravels = (req, res, next) => {
  Travels.find().then(items => {
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
