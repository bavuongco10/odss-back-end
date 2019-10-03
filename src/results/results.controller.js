const Results = require('./results.model');

exports.getResults = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 0;
  const currentOffset = parseInt(req.query.offset) || 10;
  let totalItems;

  Results.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Results.find()
        .skip((currentPage) * currentOffset)
        .limit(currentOffset);
    })
    .then(items => {
      res.status(200).json({
        message: 'Fetched sources successfully.',
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
