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

# -------------------------------------------------------------------------------------------

dataset = open_json('TP1/dataset_reparacoes.json')



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
                         <a href="intervencoes.html"> Listagem dos tipos de intervenção </a>
                    </li>

                    <li>
                         <a href="marcas_modelos.html"> Listagem das marcas e modelos dos carros intervencionados </a>
                    </li>

               </ul>
          </body>

'''

mk_dir("TP1/output")
new_file("./TP1/output/index.html", html)