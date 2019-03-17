// Modelo de dado da oferta

const mongoose = require("mongoose");

let offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value_contract: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  periods: {
    type: Number,
    required: true
  }
}, { collection: 'offers' });

module.exports = mongoose.model('OfferSchema', offerSchema);
