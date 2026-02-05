## TP1 - Estrutura de um website de exploração de um dataset

**Autor**: A106936 <br>
**Nome**: Duarte Escairo Brandão Reis Silva <br>
**Data**: 11/2/2025 <br>
**UC**: Engenharia Web

![foto](163868866.jpeg)

---

# Resumo:

O programa percorre o dataset de reparações e, para cada reparação:

- 1-Cria uma página HTML da reparação.

- 2- Atualiza um dicionário de tipos de intervenção, que adiciona novas intervenções e guarda em quais reparações aparecem.

- 3- Atualiza um dicionário de marcas e modelos, que conta carros e guarda em quais reparações aparecem e quais intervenções estão associadas.

Depois, com esses dicionários, percorre cada tipo de intervenção e cada marca/modelo para gerar páginas HTML individuais e as listas principais, criando links cruzados entre reparações, intervenções e carros.

---

# Resultados:

- [script](./script.py) - O script Python que gera as páginas HTML a partir do dataset.

# Execução:

Para executar o script, pode fazê-lo de duas formas:
1. **Usando o terminal**: Navegue até a pasta onde está a pasta `TP1` e execute o comando:

```bash
python3 TP1/script.py
```

2. **Usando um ambiente de desenvolvimento**: Abra o script `script.py` em um ambiente de desenvolvimento como o Visual Studio Code, PyCharm ou Jupyter Notebook e execute o código.