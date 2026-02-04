import json, os, shutil

def open_json(filename):
     with open (filename, 'r', encoding='utf-8') as f:
          data = json.load(f)
     return data


def mk_dir(relative_path):
     if not os.path.exists(relative_path): ## se a diretoria não existir
          os.mkdir(relative_path) ## cria a diretoria
     else:
          shutil.rmtree(relative_path) ## remove a diretoria e todo o seu conteúdo
          os.mkdir(relative_path) ## cria a diretoria vazia

def new_file(filename, content):
     with open(filename, 'w', encoding='utf-8') as f:
          f.write(content)


dataset = open_json('TP1/dataset_reparacoes.json')
# -------------------------------------------------------------------------------------------

n = 0
links_reparacoes = ""
reparacoes = ""
for reparacao in dataset["reparacoes"]:
     
     links_reparacoes += f'''
     <li>
          <a href="r{n}.html"> Reparação {n} </a>
     </li>
     '''
     n += 1

     marca = reparacao["viatura"]["marca"]
     modelo = reparacao["viatura"]["modelo"]

     reparacao2 = f'''
     <html>
          <head>
               <title> Reparação nº {n} </title>
               <meta charset="utf-8"/>
          </head>
          <body>
               <h3>  Reparação nº {n} </h3>
               <table border="1">
                    <tr> <td> Data </td> <td> {reparacao["data"]} </td> </tr>
                    <tr> <td> NIF </td> <td> {reparacao["nif"]} </td> </tr>
                    <tr> <td> Nome </td> <td> {reparacao["nome"]} </td> </tr>
                    <tr> <td> Marca </td> <td> {marca} </td> </tr>
                    <tr> <td> Modelo </td> <td> {modelo} </td> </tr>
                    <tr> <td> Nº Intervenções </td> <td> {reparacao["nr_intervencoes"]} </td> </tr>
               </table>
               <hr/>

          </body>
     </html>
     '''
     new_file("./TP1/output/reparacao.html", reparacao2)

# -------------------------------------------------------------------------------------------



# -------------------------------------------------------------------------------------------



# -------------------------------------------------------------------------------------------

html = f'''
     <html>
          <head>
               <title> Lista de reparações de uma oficina </title>
               <meta charset="utf-8"/>
          </head>
          <body>
               <h3> Lista de reparações de uma oficina </h3>
               <ul>
                    <li>
                         <a href="reparacoes.html"> Listagem das reparações </a>
                    </li>

                    <li>
                         <a href="links_reparacoes.html"> Listagem dos tipos de intervenção </a>
                    </li>

                    <li>
                         <a href="marcas_modelos.html"> Listagem das marcas e modelos dos carros intervencionados </a>
                    </li>

               </ul>
          </body>

'''

mk_dir("TP1/output")
new_file("./TP1/output/index.html", html)
new_file("./TP1/output/links_reparacoes.html", links_reparacoes)
new_file("./TP1/output/intervencoes.html", html)
new_file("./TP1/output/marcas_modelos.html", html)