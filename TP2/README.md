# Metainformação 

**Título**: TP2 - Servidor HTTP e JSON Server <br>
**Data**: 11/2/2025 <br>
**Autor**: Duarte Escairo <br>
**UC**: Engenharia Web

---

# Autor

**ID**: A106936 <br>
**Nome**: Duarte Escairo Brandão Reis Silva <br>

![foto](163868866.jpg)

# Resumo:

O programa é um servidor HTTP que serve páginas HTML geradas a partir de um dataset de reparações. De acordo com o pedido, o programa faz:

- 'http://localhost:7777/reparacoes' - lista de reparações, ordenada por ordem alfabética do nome do cliente, e para cada reparação, mostra o nome do cliente, o nif, a data, a marca, o modelo, a matricula e o número de intervenções associadas a essa reparação.
 
- 'http://localhost:7777/intervencoes' - lista de intervenções, ordenada por ordem alfabética do código, e para cada intervenção, mostra o código, o nome, a descrição e o nº de vezes que essa intervenção foi realizada.

- 'http://localhost:7777/viaturas' - lista de viaturas, ordenada por ordem alfabética da marca e modelo, e para cada viatura, mostra a marca, o modelo, a matrícula e o número de vezes que essa viatura foi reparada.

---

# Resultados:

- [http_server.js](./http_server.js) - O script Node.js que implementa o servidor HTTP para servir as páginas HTML geradas a partir do dataset.

# Execução:

Para executar o servidor json, correr:

```bash
json-server --watch dataset.json
```

Para executar o servidor http, correr:

```bash
node http_server.js
```