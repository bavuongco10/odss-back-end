const {isEmpty, toNumber, map, get, sortBy} = require('lodash');
const Sources = require('../sources/sources.model');
const Rankings = require('../rankings/rankings.model');

exports.getHotelsPivot = (req, res, next) => {
  const items = [
    {
      name: 'Bắc Giang',
      hotels: 2,
      comments: 26,
      average: 13.0,
    },
    {
      name: 'Bạc Liêu',
      hotels: 2,
      comments: 24,
      average: 12,
    },
    {
      hotels: 'Bến Tre',
      comments: 70,
      average: 23.3,
    },
    {
      name: 'Bình Dương',
      hotels: 2,
      comments: 15,
      average: 7.5,
    },
    {
      name: 'Buôn Ma Thuột',
      hotels: 13,
      comments: 338,
      average: 26.0,
    },
    {
      name: 'Cà Mau',
      hotels: 2,
      comments: 39,
      average: 19.5,
    },
    {
      name: 'Cần Thơ',
      hotels: 24,
      comments: 819,
      average: 34.1,
    },
    {
      name: 'Châu Đốc',
      hotels: 8,
      comments: 186,
      average: 23.3,
    },
    {
      name: 'Đà Lạt',
      hotels: 41,
      comments: 1665,
      average: 40.6,
    },
    {
      name: 'Đà Nẵng',
      hotels: 38,
      comments: 1756,
      average: 46.2,
    },
    {
      name: 'Đông Hà (Quảng Trị)',
      hotels: 3,
      comments: 36,
      average: 12.0,
    },
    {
      name: 'Đồng Hới (Quảng Bình)',
      hotels: 19,
      comments: 362,
      average: 19.1
    },
    {
      name: 'Hạ Long',
      hotels: 21,
      comments: 548,
      average: 26.1,
    },
    {
      name: 'Hà Nội',
      hotels: 43,
      comments: 1319,
      average: 30.7,
    },
    {
      name: 'Hà Tĩnh',
      hotels: 5,
      comments: 51,
      average: 10.2,
    },
    {
      name: 'Hải Phòng',
      hotels: 16,
      comments: 152,
      average: 9.5,
    },
    {
      name: 'Hồ Chí Minh',
      hotels: 38,
      comments: 1093,
      average: 28.8,
    },
    {
      name: 'Hòa Bình',
      hotels: 3,
      comments: 26,
      average: 8.7,
    },
    {
      name: 'Kon Tum',
      hotels: 2,
      comments: 20,
      average: 10.0,
    },
    {
      name: 'Lạng Sơn',
      hotels: 3,
      comments: 28,
      average: 9.3,
    },
    {
      name: 'Long Xuyên',
      hotels: 3,
      comments: 22,
      average: 7.3,
    },
    {
      name: 'Mỹ Tho (Tiền Giang)',
      hotels: 3,
      comments: 26,
      average: 8.7,
    },
    {
      name: 'Nam Ðịnh',
      hotels: 20,
      comments: 182,
      average: 9.1,
    },
    {
      name: 'Nha Trang',
      hotels: 38,
      comments: 1325,
      average: 34.9,
    },
    {
      name: 'Ninh Bình',
      hotels: 19,
      comments: 263,
      average: 13.8,
    },
    {
      name: 'Phan Rang - Tháp Chàm (Ninh Thuận)',
      hotels: 4,
      comments: 92,
      average: 23.0,
    },
    {
      name: 'Phan Thiết',
      hotels: 41,
      comments: 1659,
      average: 40.5,
    },
    {
      name: 'Phú Thọ',
      hotels: 3,
      comments: 36,
      average: 12.0,
    },
    {
      name: 'Pleiku (Gia Lai)',
      hotels: 6,
      comments: 133,
      average: 22.2,
    },
    {
      name: 'Quảng Ngãi',
      hotels: 7,
      comments: 71,
      average: 10.1,
    },
    {
      name: 'Quy Nhơn (Bình Định)',
      hotels: 17,
      comments: 362,
      average: 21.3,
    },
    {
      name: 'Rạch Giá (Kiên Giang)',
      hotels: 4,
      comments: 67,
      average:
        16.8,
    },
    {
      name: 'Sầm Sơn (Thanh Hóa)',
      hotels: 11,
      comments: 256,
      average: 23.3,
    },
    {
      name: 'Tam Kỳ (Quảng Nam)',
      hotels: 2,
      comments: 37,
      average: 18.5,
    },
    {
      name: 'Tây Ninh',
      hotels: 3,
      comments: 21,
      average: 7.0,
    },
    {
      name: 'Thái Bình',
      hotels: 19,
      comments: 151,
      average: 7.9,
    },
    {
      name: 'Thái Nguyên',
      hotels: 2,
      comments: 12,
      average: 6.0,
    },
    {
      name: 'Tuy Hòa (Phú Yên)',
      hotels: 12,
      comments: 311,
      average: 25.9,
    },
    {
      name: 'Vinh',
      hotels: 9,
      comments: 231,
      average: 25.7,
    },
    {
      name: 'Vĩnh Phúc',
      hotels: 3,
      comments: 44,
      average: 14.7,
    },
    {
      name: 'Vũng Tàu',
      hotels: 37,
      comments: 1606,
      average: 43.4,
    }
  ]

  return res.status(200).json({
    message: 'Fetched successfully.',
    items
  });
}


exports.getRankingHotelsPivot = (req, res, next) => {
  const items = [
    {rate: 1, hotels: 12},
    {rate: 2, hotels: 54},
    {rate: 3, hotels: 147},
    {rate: 4, hotels: 209},
    {rate: 5, hotels: 99}
  ]

  return res.status(200).json({
    message: 'Fetched successfully.',
    items
  });
}

exports.getFeatures = (req, res, next) => {
  const items = [
    { name: 'khách sạn', importantRate: 0.612},
    { name: 'view', importantRate: 0.32},
    { name: 'món ăn', importantRate: 0.095},
    { name: 'thiết bị', importantRate: 0.051},
    { name: 'ban công', importantRate: 0.037},
    { name: 'phòng', importantRate: 0},
    { name: 'lễ tân', importantRate: 0.086},
    { name: 'nội thất', importantRate: 0.05},
    { name: 'vệ sinh', importantRate: 0.242},
    { name: 'cảnh', importantRate: 0.208},
    { name: 'nhân viên', importantRate: 1},
    { name: 'không gian', importantRate: 0.173},
    { name: 'thang máy', importantRate: 0.095},
    { name: 'Wifi', importantRate: 0.016},
    { name: 'Đèn', importantRate: 0.01},
    { name: 'giá', importantRate: 0.498},
    { name: 'thái độ', importantRate: 0.156},
    { name: 'xe máy', importantRate: 0.131},
    { name: 'Toilet', importantRate: 0.082},
    { name: 'sảnh', importantRate: 0},
    { name: 'biển', importantRate: 0.735},
    { name: 'nhà hàng', importantRate: 0.147},
    { name: 'máy lạnh', importantRate: 0.092},
    { name: 'Khuôn viên', importantRate: 0.029},
    { name: 'diện tích', importantRate: 0.011},
    { name: 'vị trí', importantRate: 0.334},
    { name: 'mùi', importantRate: 0.314},
    { name: 'Khăn', importantRate: 0.13},
    { name: 'bãi tắm', importantRate: 0.038},
    { name: 'bồn tắm', importantRate: 0.026},
    { name: 'dịch vụ', importantRate: 0.201},
    { name: 'bể bơi', importantRate: 0.128},
    { name: 'cửa sổ', importantRate: 0.017},
    { name: 'hành lang', importantRate: 0.019},
    { name: 'Bar', importantRate: 0.067},
    { name: 'giường', importantRate: 0.151},
    { name: 'thức ăn', importantRate: 0.032},
    { name: 'tủ lạnh', importantRate: 0.015},
    { name: 'hướng', importantRate: 0.092},
    { name: 'bếp', importantRate: 0.027}
  ]

  return res.status(200).json({
    message: 'Fetched successfully.',
    items: sortBy(items, item => -item.importantRate)
  });
}

exports.getSummary =  (req, res, next) => {
  Rankings.find().countDocuments().then(sources => {
    Rankings.distinct('city_id').then(cities => {
      Rankings.distinct('hotel_id').then(hotels => {

          return res.status(200).json({
            message: 'Fetched successfully.',
            item: {
              sources: sources,
              cities: cities.length,
              hotels: hotels.length
            }
          });
      })
    })

  })
}

