const Sources = require('./sources.model');

exports.getSources = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 0;
  const currentOffset = parseInt(req.query.offset) || 10;
  let totalItems;

  Sources.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Sources.find()
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
