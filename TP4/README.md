# Metainformação 

**Título**: TP4 - <br>
**Data**: 26/2/2025 <br>
**Autor**: Duarte Escairo <br>
**UC**: Engenharia Web

---

# Autor

**ID**: A106936 <br>
**Nome**: Duarte Escairo Brandão Reis Silva <br>

![foto](163868866.jpg)

# Resumo:
O programa serve um conjunto de páginas HTML com os estilos css do [w3schools](https://www.w3schools.com/w3css/default.asp). Baseia-se em explorar um dataset de registos de exames médicos e disponibiliza as ações de adição, deleção e atualização de registos e disponibiliza uma página de análise estatística. Existem botões em todas as páginas para permitir a navegação entre páginas. Os endereços principais são:

- 'http://localhost:7000/' - página principal com todos os registos

- 'http://localhost:7000/emd/registo' - página de criação de um registo

- 'http://localhost:7000/emd/stats' - página da exploração das estatísticas

- 'http://localhost:7777/emd?ordenar=nomeCrescente' - página com o dataset ordenado por nome de forma alfabética crescente

- 'http://localhost:7777/emd?ordenar=nomeDecrescente' - página com o dataset ordenado por nome de forma alfabética decrescente

A ordenação do dataset, apesar de feita de forma pouco eficiente e simples, foi feita usando query strings pois foi a forma mais simples e usando os conhecimentos obtidos até ao momento na UC. Sei que seria possível fazer a organização dos dados no lado do cliente mas teria de recorrer ao uso de inteligência artificial e não saberia explicá-lo.

---

# Resultados:

- [server](src/server.js) - O script js que implementa o servidor para servir as páginas HTML geradas a partir do dataset.

- [templates](src/templates.js) - O script js que implementa as funções para gerar as páginas HTML a partir do dataset usando o módulo pug.

- [views](src/views) - O diretório com os ficheiros pug para gerar as páginas HTML a partir do dataset usando o módulo pug.

- [conversor](src/conversor.py) - O script python que implementa as funções para converter o dataset de json [original](src/datasets/emd.json) para o formato [final](src/datasets/atletas.json) usado no servidor.

# Execução:

Para executar o servidor de dados json:

```bash
cd TP4/
json-server --watch src/datasets/dataset.json
```

Para executar o servidor, certifique-se que corre os seguintes comandos:

```bash
cd TP4/src/
npm install
node server.js
```