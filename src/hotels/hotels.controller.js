const Hotels_Cities = require('./hotels_cities.model.js');
const Hotels = require('./hotels.model.js');
const {isEmpty, toNumber, map, get} = require('lodash');

exports.getHotelsByCity = (req, res, next) => {
  const city = req.query.city;
  if (isEmpty(city)) next({
    statusCode: 500,
    message: 'missing city'
  });
  Hotels_Cities.aggregate([
    {$match: {city_id: toNumber(city)}},
    {
      $lookup:
        {
          from: "Hotels",
          localField: "hotel_id",
          foreignField: "_id",
          as: "hotels"
        }
    }
  ])
    .then(items => {
      res.status(200).json({
        message: 'Fetched successfully.',
        items: map(items, item => get(item, 'hotels[0]')),
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.searchHotels = (req, res, next) => {
  const {searchText} = req.query;
  if (isEmpty(searchText)) next({
    statusCode: 500,
    message: 'missing searchText'
  });

  Hotels.find({name: {'$regex': searchText, '$options': 'i'}}).limit(7)
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
