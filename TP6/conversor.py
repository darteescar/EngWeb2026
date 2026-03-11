import json

with open("cinema_or.json", "r", encoding="utf-8") as f:
    data = json.load(f)

novo_dataset = {
    "filmes": [],
    "atores": [],
    "generos": []
}

# Dicionários para verificar duplicados e guardar IDs
atores_vistos = {}  # {nome: id}
generos_vistos = {}  # {nome: id}
filmes_vistos = set()

contador_filmes = 1
contador_atores = 1
contador_generos = 1

for info in data["filmes"]:
     titulo = info["title"]
     ano = info["year"]
     elenco = info["cast"]
     generos = info["genres"]
     
     # Processar atores - guardar nomes
     nomes_atores = []
     for ator in elenco:
          nomes_atores.append(ator)
          if ator not in atores_vistos:
               # Ator novo
               atores_vistos[ator] = contador_atores
               novo_dataset["atores"].append({
                    "id": contador_atores,
                    "nome": ator,
                    "filmes": [titulo],
                    "num_filmes": 1
               })
               contador_atores += 1
          else:
               # Ator já existe - atualizar
               ator_id = atores_vistos[ator]
               # Encontrar o ator na lista e atualizar
               for ator_obj in novo_dataset["atores"]:
                    if ator_obj["id"] == ator_id:
                         ator_obj["filmes"].append(titulo)
                         ator_obj["num_filmes"] += 1
                         break
     
     # Processar géneros - guardar nomes
     nomes_generos = []
     for genero in generos:
          nomes_generos.append(genero)
          if genero not in generos_vistos:
               # Género novo
               generos_vistos[genero] = contador_generos
               novo_dataset["generos"].append({
                    "id": contador_generos,
                    "nome": genero,
                    "filmes": [titulo],
                    "num_filmes": 1
               })
               contador_generos += 1
          else:
               # Género já existe - atualizar
               genero_id = generos_vistos[genero]
               # Encontrar o género na lista e atualizar
               for genero_obj in novo_dataset["generos"]:
                    if genero_obj["id"] == genero_id:
                         genero_obj["filmes"].append(titulo)
                         genero_obj["num_filmes"] += 1
                         break
    
     # Adicionar filme com nomes dos atores e géneros
     if titulo not in filmes_vistos:
          filme = {
               "id": contador_filmes,
               "titulo": titulo,
               "ano": ano,
               "atores": nomes_atores,
               "generos": nomes_generos,
               "num_atores": len(nomes_atores),
               "num_generos": len(nomes_generos)
          }
          novo_dataset["filmes"].append(filme)
          filmes_vistos.add(titulo)
          contador_filmes += 1

with open("cinema.json", "w", encoding="utf-8") as f:
    json.dump(novo_dataset, f, ensure_ascii=False, indent=2)

print("Arquivo cinema.json alterado com sucesso!")
print(f"Total: {len(novo_dataset['filmes'])} filmes, {len(novo_dataset['atores'])} atores, {len(novo_dataset['generos'])} géneros")