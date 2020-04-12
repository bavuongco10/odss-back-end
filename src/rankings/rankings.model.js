const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  hotel_id: Number
}, {timestamps: true, strict:false });
module.exports = mongoose.model('Rankings', schema, 'Rankings');
