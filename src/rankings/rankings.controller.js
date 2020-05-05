const {map, uniqBy, find, toNumber, uniq, sortBy} = require('lodash');
const Rakings = require('./rankings.model');
const Hotels = require('../hotels/hotels.model');
const Cities = require('../cities/cities.model');

exports.getRankings = (req, res, next) => {
  const cityId = toNumber(req.query.cityId);
  const travelType = req.query.travelType;
  const stayLength = req.query.stayLength || 1;

  const payload = {};
  if (cityId) {
    payload['city_id'] = cityId
  }
  if (travelType) {
    payload['travel_type_name'] = travelType
  }

  Rakings.find(
    payload,
    {hotel_id: 1, _id: 0, Ri: 1, stay_length: 1, city_id: 1, travel_type_name: 1}
  ).limit(10)
    .then(items => {
      const newItems = map(items, ({ stay_length, Ri, hotel_id}) => ({
        stay_length,
        Ri,
        hotel_id,
        stayDiff: Math.abs(stay_length - stayLength)
      }));
      const sortedRankings = sortBy(newItems, ['stayDiff', 'Ri']);
      const hotelIds = uniq(map(sortedRankings, 'hotel_id'));
      return Hotels.find({
        _id: {'$in': hotelIds}
      }).then(hotels => {
        const resultList = map(
          hotels, ({_id, name, accommodationType, address, cover, summaryReview}) => {
            const hotelObj = find(items, ['hotel_id', _id]);
            return {
              _id, name, accommodationType, address, cover, summaryReview,
              Ri: hotelObj.Ri,
            }
          });
        return res.status(200).json({
          message: 'Fetched successfully.',
          items: resultList
        });
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getInitialRankings = (req, res, next) => {
  Rakings.aggregate([
    {$sample: {size: 100}},
    {$match: {Ri: {$gt: 3}}},
    {$project: {hotel_id: 1, _id: 0, Ri: 1}},
  ])
    .then(items => {
      const hotelIds = map(uniqBy(items, 'hotel_id'), 'hotel_id');
      return Hotels.find({
        _id: {'$in': hotelIds}
      }).then(hotels => {
        return res.status(200).json({
          message: 'Fetched successfully.',
          items: map(
            hotels, ({_id, name, accommodationType, address, cover, summaryReview}) => ({
              _id, name, accommodationType, address, cover, summaryReview,
              Ri: find(items, ['hotel_id', _id]).Ri
            }))
        });
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getCitiesInitial =  (req, res, next) => {
  Rakings.aggregate([
    {$sample: {size: 50}},
    {$match: {Ri: {$gt: 3}}},
    {$project: {city_id: 1, _id: 0, Ri: 1}},
  ])
    .then(items => {
      const citiesIds = map(uniqBy(items, 'city_id'), 'city_id');
      return Cities.find({
        _id: {'$in': citiesIds}
      }).then(items => {
        return res.status(200).json({
          message: 'Fetched successfully.',
          items
        });
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
