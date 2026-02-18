# Metainformação 

**Título**: TP3 - <br>
**Data**: 18/2/2025 <br>
**Autor**: Duarte Escairo <br>
**UC**: Engenharia Web

---

# Autor

**ID**: A106936 <br>
**Nome**: Duarte Escairo Brandão Reis Silva <br>

![foto](163868866.jpg)

# Resumo:

O programa é um servidor que serve páginas HTML geradas a partir de um dataset de uma escola de música. De acordo com o pedido o programa obtém os dados a partir de um servidor json, e para cada pedido, gera a respetiva página HTML:

- 'http://localhost:25001/alunos' - tabela de alunos com os respetivos: nome, data de nascimento, curso, ano de curso e instrumento.

- 'http://localhost:25001/cursos' - tabela de cursos com os respetivos: id, designação, duração e instrumento (id e designação).

- 'http://localhost:25001/instrumentos' - tabela de instrumentos com os respetivos: id e designação.

---

# Resultados:

- [server_API](./server_API.js) - O script Node.js que implementa o servidor para servir as páginas HTML geradas a partir do dataset.

# Execução:

Para executar o servidor json, correr:

```bash
json-server --watch dataset.json
```

Para executar o servidor, correr:

```bash
node server_API.js
```