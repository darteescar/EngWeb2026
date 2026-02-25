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
                // GET / ou /emd ------------------------------------------------------------------
                if(req.url == '/' || req.url == '/emd' || req.url.startsWith('/emd?')){
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
                else if (req.url == '/emd/registo') {

                }
                // GET /emd/:id ---------------------------------------------------------
                else if(/\/emd\/[0-9a-zA-Z_]+$/.test(req.url)){
                    var idatleta = req.url.split('/')[2]
                    axios.get('http://localhost:3000/atletas/' + idatleta)
                    .then(resp => {
                        var infosatleta = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.analiseAtletaPage(infosatleta))
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



