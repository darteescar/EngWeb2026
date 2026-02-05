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
mk_dir("TP1/output")

links_reparacoes = ""

n = 1
for rep in dataset["reparacoes"]:

     ## Pagina Reparacões

     links_reparacoes += f'''
     <li>
          <a href="reparacao{n}.html"> Reparação {n} </a>
     </li>
     '''

     pagina_reparacao = f'''
     <html>
          <head>
               <title> Reparação nº {n} </title>
               <meta charset="utf-8"/>
          </head>
          <body>
               <h3>  Reparação nº {n} </h3>
               <table border="1">
                    <tr> <td> Data </td> <td> {rep["data"]} </td> </tr>
                    <tr> <td> NIF </td> <td> {rep["nif"]} </td> </tr>
                    <tr> <td> Nome </td> <td> {rep["nome"]} </td> </tr>
                    <tr> <td> Marca </td> <td> {rep["viatura"]["marca"]} </td> </tr>
                    <tr> <td> Modelo </td> <td> {rep["viatura"]["modelo"]} </td> </tr>
                    <tr> <td> Nº Intervenções </td> <td> {rep["nr_intervencoes"]} </td> </tr>
               </table>
               <hr/>

          </body>
     </html>
     '''

     new_file(f"./TP1/output/reparacao{n}.html", pagina_reparacao)

     n += 1

pagina_inicial = f'''
<html>
     <head>
          <title> Reparações de uma oficina </title>
          <meta charset="utf-8"/>
     </head>
     <body>
          <h3> Reparações de uma oficina </h3>
          <ul>
               <li>
                    <a href="pagina_reparacoes.html"> Listagem das reparações </a>
               </li>

               <li>
                    <a href="pagina_intervencoes.html"> Listagem dos tipos de intervenção </a>
               </li>

               <li>
                    <a href="pagina_marcas_e_modelos.html"> Listagem das marcas e modelos dos carros intervencionados </a>
               </li>

          </ul>
     </body>
'''
pagina_reparacoes = f'''
<html>
     <head>
          <title> Lista de reparações </title>
          <meta charset="utf-8"/>
     </head>
     <body>
          <h3> Lista de reparações </h3>
          <ul>
               {links_reparacoes}
          </ul>
     </body>
'''
pagina_intervencoes = ""
pagina_marcas_e_modelos = ""



new_file("./TP1/output/index.html", pagina_inicial)
new_file("./TP1/output/pagina_reparacoes.html", pagina_reparacoes)