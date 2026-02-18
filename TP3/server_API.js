


const http = require('http')
const utils = require('./myUtil.js')

async function serverCreator(req, res){
     var d = new Date().toISOString().substring(0 ,16)
     console.log(req.method + " "+ req.url + " " + d)

     switch (req.method) {
          case "GET":
               if (req.url == "/"){
                    try {
                         corpo = utils.card("Página Principal",`
                         <table class="w3-table w3-striped w3-bordered w3-hoverable">
                              <tr class=w3-light-grey>
                                   <th>Alunos</th>
                                   <th>Cursos</th>
                                   <th>Instrumentos</th>
                              </tr>
                              <tr>
                                   <th>${utils.link("http://localhost:25001/alunos", "Alunos")}
                                   <th>${utils.link("http://localhost:25001/cursos", "Cursos")}
                                   <th>${utils.link("http://localhost:25001/instrumentos", "Instrumentos")}
                              <tr>
                         </table> 
                         `)
                         res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'})
                         res.end(utils.pagina("Página Inicial", corpo))
                    }
                    catch (error) {
                         res.writeHead(500, { 'content-type': 'text/html; charset=utf-8'})
                         res.end(`<p>Erro no servidor de dados ${error}.</p>`)
                    }
               } else if (req.url == "/alunos") {
                    var alunos = await utils.getAlunos()
                    var linhas_alunos = alunos.map(a => `
                         <tr>  
                              <td>${a.id}</td>
                              <td>${a.nome}</td>
                              <td>${a.dataNasc}</td>
                              <td>${a.curso}</td>
                              <td>${a.anoCurso}</td>
                              <td>${a.instrumento}</td>
                         </tr> 
                    `).join("")

                    var corpoAlunos = utils.card("Alunos",`
                         <table class="w3-table w3-striped w3-bordered w3-hoverable">
                              <tr class=w3-light-grey>
                                   <th>ID</th>
                                   <th>Nome</th>
                                   <th>Data Nascimento</th>
                                   <th>Curso</th>
                                   <th>Ano Curso</th>
                                   <th>Instrumento</th>
                              </tr>
                              ${linhas_alunos}
                         </table> 
                         ${utils.botaoVoltar()}
                         `)
                    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'})
                    res.end(utils.pagina("Página Alunos", corpoAlunos))
               } else if (req.url == "/cursos") {
                    var cursos = await utils.getCursos()
                    var linhas_cursos = cursos.map(a => `
                         <tr>  
                              <td>${a.id}</td>
                              <td>${a.designacao}</td>
                              <td>${a.duracao}</td>
                              <td>${a.instrumento["#text"]}</td>
                         </tr>
                    `).join("")

                    var corpoCursos = utils.card("Cursos",`
                         <table class="w3-table w3-striped w3-bordered w3-hoverable">
                              <tr class=w3-light-grey>
                                   <th>ID</th>
                                   <th>Designação</th>
                                   <th>Duração</th>
                                   <th>Instrumento</th>
                              </tr>
                              ${linhas_cursos}
                         </table> 
                         ${utils.botaoVoltar()}
                         `)
                    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'})
                    res.end(utils.pagina("Página Cursos", corpoCursos))
               } else if (req.url == "/instrumentos") {
                    var instrumentos = await utils.getInstrumentos()
                    var linhas_instrumentos= instrumentos.map(a => `
                         <tr>  
                              <td>${a.id}</td>
                              <td>${a["#text"]}</td>
                         </tr>
                    `).join("")

                    var corpoInstrumentos = utils.card("Instrumentos",`
                         <table class="w3-table w3-striped w3-bordered w3-hoverable">
                              <tr class=w3-light-grey>
                                   <th>ID</th>
                                   <th>Designação</th>
                              </tr>
                              ${linhas_instrumentos}
                         </table> 
                         ${utils.botaoVoltar()}
                         `)
                    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'})
                    res.end(utils.pagina("Página Instrumentos", corpoInstrumentos))
                    
               } else {
                    res.writeHead(405, { 'content-type': 'text/html; charset=utf-8'})
                    res.end(`<p>URL não suportado.</p>`)
               }
               break
          default: 
               res.writeHead(405, { 'content-type': 'text/html; charset=utf-8'})
               res.end(`<p>Método não suportado: ${req.method}.</p>`)
     }
}

var server = http.createServer(serverCreator)
server.listen(25001)