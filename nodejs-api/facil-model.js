// Modelo de dado facilitadora
const mongoose = require("mongoose");

let facilsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birth_date: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cur_plans: {
    type: Array,
    required: false
  }

}, { collection: 'facils' });

module.exports = mongoose.model('FacilsSchema', facilsSchema);
