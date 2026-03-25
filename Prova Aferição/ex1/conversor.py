import json

with open("dataset_reparacoes.json", "r", encoding="utf-8") as f:
    data = json.load(f)

with open("repairs.json", "w", encoding="utf-8") as f:
    json.dump(data["reparacoes"], f, ensure_ascii=False, indent=2)

print(f"Convertido com sucesso: {len(data['reparacoes'])} reparações exportadas para repairs.json")