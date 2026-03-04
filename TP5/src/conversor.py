import json

with open("src/datasets/cinema.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for i, filme in enumerate(data["filmes"]):
    filme["id"] = i

with open("src/datasets/cinema.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Arquivo cinema.json alterado com sucesso!")