# Metainformação 

**Título**: TP5 - <br>
**Data**: 11/2/2025 <br>
**Autor**: Duarte Escairo <br>
**UC**: Engenharia Web

---

# Autor

**ID**: A106936 <br>
**Nome**: Duarte Escairo Brandão Reis Silva <br>

![foto](163868866.jpg)

# Resumo:
O programa serve um pequeno conjunto de páginas HTML com os estilos css do [w3schools](https://www.w3schools.com/w3css/default.asp). Baseia-se em explorar um dataset de filmes de um cinema entre os seus filmes, atores e gêneros. Existem botões em todas as páginas para permitir a navegação entre páginas. Os endereços principais são:

- 'http://localhost:3007/' - página principal com todos os filmes

- 'http://localhost:3007/atores' - página com todos os atores

- 'http://localhost:3007/generos' - página com todos os gêneros

- 'http://localhost:3007/filmes/:id' - página com detalhes de um filme específico

- 'http://localhost:3007/atores/:id' - página com detalhes de um ator específico

- 'http://localhost:3007/generos/:id' - página com detalhes de um gênero específico

---

# Resultados:

- [server](src/app.js) - O script js que implementa o servidor para servir as páginas HTML geradas a partir do dataset.

- [routes](src/routes) - O diretório com os ficheiros js para implementar as rotas para servir as páginas HTML geradas a partir do dataset usando o módulo pug.

- [views](src/views) - O diretório com os ficheiros pug para gerar as páginas HTML a partir do dataset usando o módulo pug.

# Execução:

Para executar o servidor de dados json:

```bash
cd TP5/
json-server --watch src/datasets/filmes.json
```

Para executar o servidor, certifique-se que corre os seguintes comandos:

```bash
cd TP5/src/
npm install
npm run start
```