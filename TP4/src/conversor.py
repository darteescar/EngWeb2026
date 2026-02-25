import json

# Lê o JSON original
with open("datasets/emd.json", "r", encoding="utf-8") as f:
    data = json.load(f)

atletas = []
for info in data:
    atleta = info.copy()          # copia o dicionário
    atleta['id'] = atleta.pop('_id')  # renomeia _id -> id
    atletas.append(atleta)

# Cria o resultado final
res = {"atletas": atletas}

# Escreve no novo arquivo
with open("datasets/atletas.json", "w", encoding="utf-8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)

print("Arquivo atletas.json criado com sucesso!")