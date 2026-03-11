#!/bin/bash
# Importa o JSON com 3 coleções: filmes, atores, generos
mongosh cinema --eval '
  const data = JSON.parse(fs.readFileSync("/docker-entrypoint-initdb.d/cinema.json", "utf8"));
  db.filmes.insertMany(data.filmes);
  db.atores.insertMany(data.atores);
  db.generos.insertMany(data.generos);
  print("Importação concluída!");
'

# Cria índices de texto
mongosh cinema --eval 'db.filmes.createIndex({titulo: "text"});'
mongosh cinema --eval 'db.atores.createIndex({nome: "text"});'
mongosh cinema --eval 'db.generos.createIndex({nome: "text"});'