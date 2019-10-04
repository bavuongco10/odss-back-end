const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: Number
}, {timestamps: true, strict:false });
module.exports = mongoose.model('Hotels', schema, 'Hotels');
