const db = require("./db-connection.js");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
  res.send("Deu certo!")
})


app.post('/post-register', function(req,res){

})

app.listen(3000,function(){
  console.log("Ouvindo a porta 3000!");
})
