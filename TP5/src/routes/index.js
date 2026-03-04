var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes")
    .then(resp => {
      var filmes = resp.data     
      filmes.forEach(element => {
        element.num_generos = element.genres.length
        element.num_atores = element.cast.length
      });
      res.render('index', { lista: filmes, date: d });
  })
});

router.get('/filmes', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  regex = 
  axios.get("http://localhost:3000/filmes/")
    .then(resp => {
      var filmes = resp.data     
      filmes.forEach(element => {
        element.num_generos = element.genres.length
        element.num_atores = element.cast.length
      });
      res.render('index', { lista: filmes, date: d });
  })
});

router.get('/filmes/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes/" + req.params.id)
    .then(resp => {
      var filme = resp.data
      filme.num_generos = filme.genres.length
      filme.num_atores = filme.cast.length
      res.render('filme', { elem: filme, date: d });
  })
});

router.get('/atores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes/")
    .then(resp => {
      atores = {}
      var filmes = resp.data     
      filmes.forEach(filme => {
        if (Array.isArray(filme.cast)) {
          filme.cast.forEach(ator => {
            if (ator) {
              if (!atores[ator]) {
                atores[ator] = { name: ator, num_filmes: 1 };
              } else {
                atores[ator].num_filmes++;
              }
            }
          });
        }
      });

      res.render('atores', { lista: Object.values(atores), date: d });
  })
});

router.get('/atores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes/")
    .then(resp => {
      atores = {}
      var filmes_da_bd = resp.data 
      filmes_da_bd.forEach(filme => {
        if (Array.isArray(filme.cast)) {
          filme.cast.forEach(ator => {
            if (ator) {
              if (!atores[ator]) {
                atores[ator] = { 
                  nome: ator,
                  filmes: [{ id: filme.id, title: filme.title }]
                };
              } else {
                atores[ator].filmes.push({ id: filme.id, title: filme.title });
              }
            }
          });
        }
      });
      res.render('ator', { elem: atores[req.params.id], date: d });
  })
});

module.exports = router;