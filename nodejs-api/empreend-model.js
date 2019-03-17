// Modelo de dado empreendedora
const mongoose = require("mongoose");

let empreendSchema = new mongoose.Schema({
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
  facil_id: {
    type: String,
    required: false
  },
  cur_plans: {
    type: Array,
    required: false
  }
}, { collection: 'empreends' });

module.exports = mongoose.model('EmpreendSchema', empreendSchema);
