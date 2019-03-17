const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://fake_user:admin123@ds261450.mlab.com:61450/hacknu" , function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Banco Conectado")
  }
});
