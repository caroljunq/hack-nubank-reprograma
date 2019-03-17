const Facil = require('./facil-model');

// Adiciona Facilitadora
function all(){
  return Facil.find();
}

// Salva novo facilitadora
function save(facil){
  let new_facil = new Facil(facil);
  console.log(new_facil)
  return new_facil.save();
}

module.exports.all = all;
module.exports.save = save;
