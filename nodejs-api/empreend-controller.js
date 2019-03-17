const Empreend = require('./empreend-model');

// Retorna todas as empreendedoras
function all(){
  return Empreend.find();
}

// Salva uma nova empreendedora no banco
function save(empreend){
  let new_empreend = new Empreend(empreend);
  console.log(new_empreend)
  return new_empreend.save();
}

module.exports.all = all;
module.exports.save = save;
