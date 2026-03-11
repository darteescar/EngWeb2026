# Metainformação 

**Título**: TP6 - <br>
**Data**: 11/3/2026 <br>
**Autor**: Duarte Escairo <br>
**UC**: Engenharia Web

---

# Autor

**ID**: A106936 <br>
**Nome**: Duarte Escairo Brandão Reis Silva <br>

![foto](163868866.jpg)

# Resumo:
O programa serve um pequeno conjunto de páginas HTML com os estilos css do [w3schools](https://www.w3schools.com/w3css/default.asp). Baseia-se em explorar um dataset de filmes de um cinema entre os seus filmes, atores e géneros. O sistema utiliza Docker Compose para orquestrar três serviços: MongoDB para armazenamento de dados, uma API REST em Node.js/Express para gestão de dados, e uma interface web em Node.js/Express com templates Pug. Existem botões em todas as páginas para permitir a navegação entre páginas. Os endereços principais são:

- 'http://localhost:7790/' - página principal com todos os filmes

- 'http://localhost:7790/atores' - página com todos os atores

- 'http://localhost:7790/generos' - página com todos os géneros

- 'http://localhost:7790/filmes/:id' - página com detalhes de um filme específico

- 'http://localhost:7790/atores/:id' - página com detalhes de um ator específico

- 'http://localhost:7790/generos/:id' - página com detalhes de um género específico

A API REST também está disponível com as seguintes coleções:
- 'http://localhost:7789/filmes' - Coleção de filmes com operações CRUD
- 'http://localhost:7789/atores' - Coleção de atores com operações CRUD
- 'http://localhost:7789/generos' - Coleção de géneros com operações CRUD

---

# Resultados:

- [conversor.py](conversor.py) - Script Python que converte o dataset original para o formato com 3 coleções (filmes, atores, géneros).

- [docker-compose.yml](docker-compose.yml) - Ficheiro de orquestração dos três serviços Docker (MongoDB, API, Interface).

- [api_dados/myServer_sel_proj.js](api_dados/myServer_sel_proj.js) - Servidor REST API que implementa operações CRUD para as 3 coleções.

- [interface/app_interface.js](interface/app_interface.js) - Servidor de interface que consome a API REST e gera páginas HTML usando templates Pug.

- [interface/views](interface/views) - Diretório com os ficheiros Pug para gerar as páginas HTML (filmes.pug, atores.pug, generos.pug, filme-detalhes.pug, ator-detalhes.pug, genero-detalhes.pug).

- [api_dados/mongo-init](api_dados/mongo-init) - Diretório com o script de inicialização do MongoDB (import.sh) e o dataset (cinema.json).

# Execução:

Para converter o dataset original:

```bash
cd TP6/
python3 conversor.py
cp cinema.json api_dados/mongo-init/
```

Para executar todo o sistema com Docker Compose:

```bash
cd TP6/
docker compose up -d --build
```

Para parar o sistema:

```bash
cd TP6/
docker compose down
```

Os serviços estarão disponíveis em:
- Interface Web: http://localhost:7790
- API REST: http://localhost:7789
