# Metainformação 

**Título**: TP1 - Estrutura de um website de exploração de um dataset <br>
**Data**: 11/2/2025 <br>
**Autor**: Duarte Escairo <br>
**UC**: Engenharia Web

---

# Autor

**ID**: A106936 <br>
**Nome**: Duarte Escairo Brandão Reis Silva <br>

![foto](163868866.jpg)

# Resumo:

O programa percorre o dataset de reparações e, para cada reparação:

- 1- Cria uma página HTML da reparação.

- 2- Atualiza um dicionário de tipos de intervenção, que adiciona novas intervenções e guarda em quais reparações aparecem.

- 3- Atualiza um dicionário de marcas e modelos, que conta carros e guarda em quais reparações aparecem e quais intervenções estão associadas.

Depois, com esses dicionários, percorre cada tipo de intervenção e cada marca/modelo para gerar páginas HTML individuais e as listas principais, criando links cruzados entre reparações, intervenções e carros.

---

# Resultados:

- [script](./script.py) - O script Python que gera as páginas HTML a partir do dataset.
- [dataset](./dataset_reparacoes.json) - O dataset de reparações utilizado para gerar as páginas HTML.
- [index](./index.html) - A página principal do website onde se encontram os links para as páginas de reparações, intervenções e marcas/modelos.
- [reparacoes](./pagina_reparacoes/) - A página que lista todas as reparações, com links para as páginas individuais de cada reparação.
- [intervencoes](./pagina_intervencoes/) - A página que lista todas as intervenções, com links para as páginas individuais de cada intervenção.
- [marcas_e_modelos](./pagina_marcas_e_modelos/) - A página que lista todas as marcas e modelos, com links para as páginas individuais de cada modelo.
- as páginas de cada reparação, intervenção e modelo, que contêm detalhes específicos sobre cada uma.

# Execução:

Para executar o script, basta:

```bash
python3 TP1/script.py
```