const axios = require('axios');
const http = require('http');
const url = require('url');

http.createServer(function (req, res) {

     if (req.url == '/reparacoes') {
          axios.get('http://localhost:3000/reparacoes')
               .then(resp => {

                    html = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                         <meta charset="UTF-8">
                         <title>Reparações</title>
                    </head>
                    <body>
                         <h1>Reparações</h1>
                         <table border="1">
                              <tr>
                                   <th>Nome</th>
                                   <th>NIF</th>
                                   <th>Data</th>
                                   <th>Marca</th>
                                   <th>Modelo</th>
                                   <th>Matricula</th>
                                   <th>Nr de Intervenções</th>
                              </tr>`; 

                    dados = resp.data;

                    Array.from(dados).sort((a, b) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0)
                         .forEach(a => {
                              html += `<tr>
                              <td>${a.nome}</td>
                              <td>${a.nif}</td>
                              <td>${a.data}</td>
                              <td>${a.viatura.marca}</td>
                              <td>${a.viatura.modelo}</td>
                              <td>${a.viatura.matricula}</td>
                              <td>${a.nr_intervencoes}</td>
                         </tr>`;
                         });

                    html += `</table></body></html>`;

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(html);
               })
               .catch(error => {
                    res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end("<pre>" + JSON.stringify(error) + "</pre>");
               });

     
     } else if (req.url == '/intervencoes') {
          axios.get('http://localhost:3000/reparacoes')
               .then(resp => {

                    mapa = new Map();

                    dados = resp.data;
                    dados.forEach(a => {
                         a.intervencoes.forEach(i => {
                              if (!mapa.has(i.codigo)) {
                                        mapa.set(i.codigo, {
                                             nome: i.nome,
                                             descricao: i.descricao,
                                             total: 0
                                        });
                              }
                              mapa.get(i.codigo).total++;
                         })
                    });

                    html = `
                         <html>
                              <head>
                                   <meta charset="UTF-8">
                                   <title>Intervenções</title>
                              </head>
                              <body>
                                   <h1>Intervenções</h1>
                                   <table border="1">
                                   <tr>
                                        <th>Código</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Nº vezes</th>
                             stra a marca, o modelo, a matrícula e o número de vezes que essa viatura foi reparada.      </tr>`;

                    Array.from(mapa.entries())
                         .sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)
                         .forEach(([k, v]) => {
                              html += `<tr>
                                   <td>${k}</td>
                                   <td>${v.nome}<reparacoes/td>
                                   <td>${v.descricao}</td>
                                   <td>${v.total}</td>
                              </tr>`;
                         });

                    html += `
                                   </table>
                              </body>
                         </html>`;

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(html);
               })
               .catch(error => {
                    res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end("<pre>" + JSON.stringify(error) + "</pre>");
               });
     } else if (req.url == '/viaturas') {
          axios.get('http://localhost:3000/reparacoes')
               .then(resp => {
                    
                    mapa = new Map();

                    dados = resp.data;
                    dados.forEach(a => {
                         id_carro = a.viatura.marca + a.viatura.modelo

                         if (!(mapa.has(id_carro))){
                              mapa.set(id_carro, {
                                             marca: a.viatura.marca,
                                             modelo: a.viatura.modelo,
                                             matricula: "",
                                             vezes: 0
                                        });
                         }

                         mapa.get(id_carro).vezes++;
                         mapa.get(id_carro).matricula += a.viatura.matricula + " ";
                    });

                    html = `
                         <html>
                              <head>
                                   <meta charset="UTF-8">
                                   <title>Intervenções</title>
                              </head>
                              <body>
                                   <h1>Intervenções</h1>
                                   <table border="1">
                                   <tr>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Matrícula</th>
                                        <th>Nº Intervenções</th>
                                   </tr>`;

                    Array.from(mapa.entries())
                         .sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)
                         .forEach(([k, v]) => {
                              html += `<tr>
                                   <td>${v.marca}</td>
                                   <td>${v.modelo}</td>
                                   <td>${v.matricula}</td>
                                   <td>${v.vezes}</td>
                              </tr>`;
                         });

                    html += `
                                   </table>
                              </body>
                         </html>`;

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(html);
               })
               .catch(error => {
                    res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end("<pre>" + JSON.stringify(error) + "</pre>");
               });
     } else {
          res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
          res.end("Pedido não suportado: " + req.url);
     }

}).listen(7777);

console.log('Servidor à escuta na porta 7777...');
