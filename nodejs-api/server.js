const db = require("./db-connection.js");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const empreendCtrl = require("./empreend-controller");
const facilCtrl = require("./facils-controller");
const offerCtrl = require("./offer-controller");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
  res.send("Rodando.")
})

// Lista todas as empreendedoras
app.get("/empreendedoras", (req, res) => {
  empreendCtrl.all()
    .then((registers) =>{
      res.send(registers);
    })
    .catch((err) =>{
      res.send("Não foi possível consultar empreendedoras!");
    })
})

// Adiciona empreendedora
app.post('/post-empreend', (req,res) =>{
  empreendCtrl.save(req.body)
    .then(() =>{
      res.send("Empreendedora inserida!");
    })
    .catch((err) =>{
      console.log(err)
      res.send("Não foi possível inserir empreendedora!");
    })
})

// Lista facilitadoras
app.get("/facilitadoras", (req, res) => {
  facilCtrl.all()
    .then((registers) =>{
      res.send(registers);
    })
    .catch((err) =>{
      res.send("Não foi possível consultar facilitadoras!");
    })
})

// Adiciona facilitadora
app.post('/post-facil', (req,res) =>{
  facilCtrl.save(req.body)
    .then(() =>{
      res.send("Facilitadora inserida!");
    })
    .catch((err) =>{
      console.log(err)
      res.send("Não foi possível inserir facilitadora!");
    })
})

// Lista ofertas
app.get("/ofertas", (req, res) => {
  facilCtrl.all()
    .then((registers) =>{
      res.send(registers);
    })
    .catch((err) =>{
      res.send("Não foi possível consultar facilitadoras!");
    })
})

// Adiciona facilitadora
app.post('/post-oferta', (req,res) =>{
  offerCtrl.save(req.body)
    .then(() =>{
      res.send("Oferta inserida!");
    })
    .catch((err) =>{
      res.send("Não foi possível inserir oferta!");
    })
})

app.listen(3000,function(){
  console.log("Ouvindo a porta 3000!");
})
