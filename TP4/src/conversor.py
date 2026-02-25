import json

with open("src/datasets/emd.json", "r", encoding="utf-8") as f:
    data = json.load(f)

atletas = []
for info in data:
    atleta = info.copy()
    atleta['id'] = atleta.pop('_id')

    atleta['primeiro_nome'] = atleta['nome']['primeiro']
    atleta['ultimo_nome'] = atleta['nome']['último']

    atleta.pop('nome')

    atletas.append(atleta)

res = {"atletas": atletas}

with open("src/datasets/atletas.json", "w", encoding="utf-8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)

print("Arquivo atletas.json criado com sucesso!")