const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// O meu logger
app.use(function(req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    next()
})

// 1. Conexão ao MongoDB
const nomeBD = "cinema"
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`
mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

// 2. Esquemas para as 3 coleções
const filmesSchema = new mongoose.Schema({}, { strict: false, collection: 'filmes', versionKey: false });
const atoresSchema = new mongoose.Schema({}, { strict: false, collection: 'atores', versionKey: false });
const generosSchema = new mongoose.Schema({}, { strict: false, collection: 'generos', versionKey: false });

const Filme = mongoose.model('Filme', filmesSchema);
const Ator = mongoose.model('Ator', atoresSchema);
const Genero = mongoose.model('Genero', generosSchema);

// 3. Função auxiliar para criar rotas CRUD
function createCRUDRoutes(Model, resourceName) {
    
    // GET /resource - Listar com FTS, Ordenação e Projeção
    app.get(`/${resourceName}`, async (req, res) => {
        try {
            let queryObj = { ...req.query };
            
            const searchTerm = queryObj.q;
            const fields = queryObj._select;
            const sortField = queryObj._sort;
            const order = queryObj._order === 'desc' ? -1 : 1;

            delete queryObj.q;
            delete queryObj._select;
            delete queryObj._sort;
            delete queryObj._order;
            
            // Converter 'id' para número se existir
            if (queryObj.id) {
                queryObj.id = parseInt(queryObj.id);
            }

            let mongoQuery = {};
            let projection = {};
            let mongoSort = {};

            if (searchTerm) {
                mongoQuery = { $text: { $search: searchTerm } };
                projection.score = { $meta: "textScore" };
                mongoSort = { score: { $meta: "textScore" } };
            } else {
                mongoQuery = queryObj;
            }

            if (fields) {
                fields.split(',').forEach(f => {
                    projection[f.trim()] = 1;
                });
            }

            let execQuery = Model.find(mongoQuery, projection);

            if (sortField) {
                execQuery = execQuery.sort({ [sortField]: order });
            } else if (searchTerm) {
                execQuery = execQuery.sort(mongoSort);
            }

            const items = await execQuery.exec();
            res.json(items);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET /resource/:id
    app.get(`/${resourceName}/:id`, async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ error: "Não encontrado" });
            res.json(item);
        } catch (err) {
            res.status(400).json({ error: "ID inválido ou erro de sistema" });
        }
    });

    // POST /resource
    app.post(`/${resourceName}`, async (req, res) => {
        try {
            const newItem = new Model(req.body);
            const saved = await newItem.save();
            res.status(201).json(saved);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // PUT /resource/:id
    app.put(`/${resourceName}/:id`, async (req, res) => {
        try {
            const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) return res.status(404).json({ error: "Não encontrado" });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // DELETE /resource/:id
    app.delete(`/${resourceName}/:id`, async (req, res) => {
        try {
            const deleted = await Model.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ error: "Não encontrado" });
            res.json({ message: "Eliminado com sucesso", id: req.params.id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}

// 4. Criar rotas para as 3 coleções
createCRUDRoutes(Filme, 'filmes');
createCRUDRoutes(Ator, 'atores');
createCRUDRoutes(Genero, 'generos');

app.listen(7789, () => console.log('API cinema em http://localhost:7789\n  /filmes\n  /atores\n  /generos'));