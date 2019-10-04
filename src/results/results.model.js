const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  review_score: Number,
  sentiment_scores: Array
}, {timestamps: true, strict:false });
module.exports = mongoose.model('Results', schema, 'Results');
