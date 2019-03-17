const Offer = require('./offers-model');

// Adiciona oferta da instituição financeira
function all(){
  return Offer.find();
}

// Salva nova oferta
function save(offer){
  let new_offer = new Offer(offer);
  return new_offer.save();
}

module.exports.all = all;
module.exports.save = save;
