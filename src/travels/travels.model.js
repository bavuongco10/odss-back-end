const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
}, {timestamps: true, strict:false });
module.exports = mongoose.model('Travels', schema, 'Travels');
