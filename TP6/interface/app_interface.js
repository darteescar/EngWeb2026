const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API
const API_URL = process.env.API_URL || "http://localhost:7789";

// Rota principal - redireciona para /filmes
app.get('/', (req, res) => {
    res.redirect('/filmes');
});

app.get('/cinema', (req, res) => {
    res.redirect('/filmes');
});

// Lista de filmes
app.get('/filmes', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    axios.get(API_URL + '/filmes')
        .then(response => {
            res.render('filmes', { 
                filmes: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter filmes da API" 
            });
        });
});

// Detalhes de um filme
app.get('/filmes/:id', async (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    try {
        // Buscar filme pelo campo 'id' customizado
        const filmeResponse = await axios.get(API_URL + '/filmes?id=' + req.params.id);
        const filme = filmeResponse.data[0];
        
        if (!filme) {
            return res.render('error', { 
                error: 'Filme não encontrado', 
                message: "Filme não encontrado" 
            });
        }
        
        res.render('filme-detalhes', { 
            filme: filme,
            date: d 
        });
    } catch (err) {
        res.render('error', { 
            error: err, 
            message: "Erro ao obter detalhes do filme" 
        });
    }
});

// Lista de atores
app.get('/atores', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    axios.get(API_URL + '/atores')
        .then(response => {
            res.render('atores', { 
                atores: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter atores da API" 
            });
        });
});

// Detalhes de um ator
app.get('/atores/:id', async (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    try {
        // Buscar ator pelo campo 'id' customizado
        const atorResponse = await axios.get(API_URL + '/atores?id=' + req.params.id);
        const ator = atorResponse.data[0];
        
        if (!ator) {
            return res.render('error', { 
                error: 'Ator não encontrado', 
                message: "Ator não encontrado" 
            });
        }
        
        // Buscar informações dos filmes do ator
        const filmesResponse = await axios.get(API_URL + '/filmes');
        const todosFilmes = filmesResponse.data;
        
        // Filtrar filmes que contêm este ator (pelo nome)
        const filmesDoAtor = todosFilmes.filter(f => 
            f.atores && f.atores.includes(ator.nome)
        );
        
        res.render('ator-detalhes', { 
            ator: ator,
            filmes: filmesDoAtor,
            date: d 
        });
    } catch (err) {
        res.render('error', { 
            error: err, 
            message: "Erro ao obter detalhes do ator" 
        });
    }
});

// Lista de géneros
app.get('/generos', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    axios.get(API_URL + '/generos')
        .then(response => {
            res.render('generos', { 
                generos: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter géneros da API" 
            });
        });
});

// Detalhes de um género
app.get('/generos/:id', async (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    try {
        // Buscar género pelo campo 'id' customizado
        const generoResponse = await axios.get(API_URL + '/generos?id=' + req.params.id);
        const genero = generoResponse.data[0];
        
        if (!genero) {
            return res.render('error', { 
                error: 'Género não encontrado', 
                message: "Género não encontrado" 
            });
        }
        
        // Buscar informações dos filmes do género
        const filmesResponse = await axios.get(API_URL + '/filmes');
        const todosFilmes = filmesResponse.data;
        
        // Filtrar filmes que contêm este género (pelo nome)
        const filmesDoGenero = todosFilmes.filter(f => 
            f.generos && f.generos.includes(genero.nome)
        );
        
        res.render('genero-detalhes', { 
            genero: genero,
            filmes: filmesDoGenero,
            date: d 
        });
    } catch (err) {
        res.render('error', { 
            error: err, 
            message: "Erro ao obter detalhes do género" 
        });
    }
});

const PORT = 7790;
app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}/filmes`);
});