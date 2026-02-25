// treinos_server.js
// EW2025 : 2025-02-24
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')           // Necessario criar e colocar na mesma pasta
var static = require('./static.js')                 // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var treinosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET / ou /emd
                if(req.url == '/' || req.url == '/emd' || req.url.startsWith('/emd?')){
                    console.log("Página inicial")
                    var crescente = 0;
                    if(/\/emd\?ordenar=nomeCrescente$/.test(req.url)) {
                        crescente = 1;
                    } else if(/\/emd\?ordenar=nomeDecrescente$/.test(req.url)) {
                        crescente = 2;
                    }
                    axios.get("http://localhost:3000/atletas")
                    .then(resp => {
                        var analises = resp.data
                        if (crescente === 1) {
                            analises.sort((a,b) => (a.primeiro_nome + ' ' + a.ultimo_nome).localeCompare(b.primeiro_nome + ' ' + b.ultimo_nome));
                        } else if (crescente === 2 ){
                            analises.sort((a,b) => (b.primeiro_nome + ' ' + b.ultimo_nome).localeCompare(a.primeiro_nome + ' ' + a.ultimo_nome));
                        }
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.analisesListPage(analises))
                    })
                }
                else if (req.url == '/emd/registo'){
                    console.log("Página de criar registo")
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.formExamePage())
                }
                // GET /emd/editar/:id
                else if (/\/emd\/editar\/[0-9a-zA-Z_]+$/.test(req.url)){
                    console.log("Página editar registo")
                    var idreg = req.url.split('/')[3]
                    axios.get('http://localhost:3000/atletas/' + idreg)
                    .then(resp => {
                        var treino = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.formExamePage(treino))
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end('<address><a href="/">Voltar</a></address>')
                    })
                }
                // GET /emd/:id
                else if(/\/emd\/[0-9a-zA-Z_]+$/.test(req.url)){
                    console.log("Página registo")
                    var idreg = req.url.split('/')[2]
                    axios.get('http://localhost:3000/atletas/' + idreg)
                    .then(resp => {
                        var infosatleta = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.analiseAtletaPage(infosatleta))
                    })
                }
                break
            case "POST":
                if (req.url == '/emd') {    
                    console.log("post criar registo")
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/atletas', result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Registo inserido com sucesso: ' + JSON.stringify(resp.data) + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Não foi possível inserir o registo...</p>')
                                res.write('<p>' + erro + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                        }
                        else {
                            res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>NÃ£o foi possível obter os dados do body...</p>')
                            res.end('<address><a href="/">Voltar</a></address>')
                        }
                    })
                } else if (/\/emd\/editar\/[0-9a-zA-Z_]+$/.test(req.url)) {
                    console.log("Página post editar registo")
                    var idatleta = req.url.split('/')[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/atletas/' + idatleta, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Registo atualizado com sucesso: ' + JSON.stringify(resp.data) + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Erro ao atualizar o registo...</p>')
                                res.write('<p>' + erro + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                        }
                        else {
                            res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possível obter os dados do body...</p>')
                            res.end('<address><a href="/">Voltar</a></address>')
                        }
                    })
                } else if (/\/emd\/apagar\/[0-9a-zA-Z_]+$/.test(req.url)) {
                    console.log("POST apagar registo")
                    var idatleta = req.url.split('/')[3]
                    axios.delete('http://localhost:3000/atletas/' + idatleta)
                    .then(resp => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Registo apagado com sucesso!</p>')
                        res.write('<p>Dados apagados: ' + JSON.stringify(resp.data) + '</p>')
                        res.end('<address><a href="/">Voltar à página inicial</a></address>')
                    })
                    .catch(erro => {
                        res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Erro ao apagar o registo...</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end('<address><a href="/">Voltar</a></address>')
                    })
                }
                break
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

treinosServer.listen(7777, ()=>{
    console.log("Servidor à  escuta na porta 7777...")
})



