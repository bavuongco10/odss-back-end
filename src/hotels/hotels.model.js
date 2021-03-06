const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: Number,
  name: String,
  accommodationType: Object,
  address: Object,
  cover: String,
  summaryReview: Object
}, {timestamps: true, strict:false });
module.exports = mongoose.model('Hotels', schema, 'Hotels');
