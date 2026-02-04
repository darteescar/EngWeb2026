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
# -------------------------------------------------------------------------------------------

n = 1
reparacoes = ""
links_reparacoes = ""
links_intervencoes = ""
infos_intervencoes = {}
infos_marcas = {}
for reparacao in dataset["reparacoes"]:
     
     links_reparacoes += f'''
     <li>
          <a href="r{n}.html"> Reparação {n} </a>
     </li>
     '''

     marca = reparacao["viatura"]["marca"]
     modelo = reparacao["viatura"]["modelo"]
     viatura = reparacao["viatura"]["matricula"]

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
     new_file(f"./TP1/output/r{n}.html", reparacao2)

     for intervencao in reparacao["intervencoes"]:
          codigo = intervencao["codigo"]

          if codigo not in infos_intervencoes:
               infos_intervencoes[codigo] = {
                    "codigo": intervencao["codigo"],
                    "nome": intervencao["nome"],
                    "descricao": intervencao["descricao"],
                    "reparacoes": []
               }

          infos_intervencoes[codigo]["reparacoes"].append(n)

     n += 1

     if marca not in infos_marcas:
          infos_marcas[marca] = {
               "modelos": {}
     }
     if modelo not in infos_marcas[marca]["modelos"]:
          infos_marcas[marca]["modelos"][modelo] = set()

     infos_marcas[marca]["modelos"][modelo].add(viatura)

for codigo in sorted(infos_intervencoes.keys()):
     info = infos_intervencoes[codigo]

     links_intervencoes += f"""
     <li>
          <a href="{info["codigo"]}.html"> {info["codigo"]} - {info["nome"]} - {info["descricao"]} </a>
     </li>
     """

     lista_reparacoes = ""
     for r in info["reparacoes"]:
          lista_reparacoes += f'<li><a href="r{r}.html">Reparação {r}</a></li>'

     intervencao = f'''
     <html>
          <head>
               <title> Intervenção {info["codigo"]} </title>
               <meta charset="utf-8"/>
          </head>
          <body>
               <h3>  Intervenção {info["codigo"]} </h3>
               <table border="1">
                    <tr> <td> Código </td> <td> {info["codigo"]} </td> </tr>
                    <tr> <td> Nome </td> <td> {info["nome"]} </td> </tr>
                    <tr> <td> Descrição </td> <td> {info["descricao"]} </td> </tr>
               </table>
               <h4>Reparações</h4>
               <ul>
               {lista_reparacoes}
               </ul>

               <hr/>

          </body>
     </html>
     '''
     new_file(f'./TP1/output/{info["codigo"]}.html', intervencao)

# ------------------- PAGINAS MARCAS E MODELOS -------------------

links_marcas = ""

for marca in sorted(infos_marcas.keys()):
     info = infos_marcas[marca]

     links_marcas += f'''
     <li>
          <a href="{marca}.html"> Marca: {marca} </a>
     </li>
     '''

     modelos_links = ""

     for modelo in sorted(info["modelos"].keys()):

          # criar página do modelo
          matriculas = ""
          for m in sorted(info["modelos"][modelo]):
               matriculas += f"<li>{m}</li>"

          pag_modelo = f'''
          <html>
               <head>
                    <title>{marca} - {modelo}</title>
                    <meta charset="utf-8"/>
               </head>
               <body>
                    <h3>{marca} - {modelo}</h3>
                    <h4>Matrículas</h4>
                    <ul>
                         {matriculas}
                    </ul>
                    <hr/>
                    <a href="{marca}.html">Voltar à marca</a>
               </body>
          </html>
          '''

          new_file(f"./TP1/output/{marca}_{modelo}.html", pag_modelo)

          modelos_links += f'''
          <li>
             <a href="{marca}_{modelo}.html">{modelo}</a>
          </li>
          '''

     # criar página da marca
     pag_marca = f'''
     <html>
          <head>
               <title>{marca}</title>
               <meta charset="utf-8"/>
          </head>
          <body>
               <h3>{marca}</h3>
               <p>Número de modelos: {len(info["modelos"])}</p>
               <ul>
                    {modelos_links}
               </ul>
               <hr/>
               <a href="marcas_modelos.html">Voltar às marcas</a>
          </body>
     </html>
     '''

     new_file(f"./TP1/output/{marca}.html", pag_marca)     

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
                         <a href="intervencoes.html"> Listagem dos tipos de intervenção </a>
                    </li>

                    <li>
                         <a href="marcas_modelos.html"> Listagem das marcas e modelos dos carros intervencionados </a>
                    </li>

               </ul>
          </body>

'''

new_file("./TP1/output/index.html", html)
new_file("./TP1/output/reparacoes.html", links_reparacoes)
new_file("./TP1/output/intervencoes.html", links_intervencoes)
new_file("./TP1/output/marcas_modelos.html", links_marcas)