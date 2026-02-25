const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`src/views/${fileName}.pug`, data);
}

exports.analisesListPage = (lista_analises) => renderPug('index', { list: lista_analises });
exports.analiseAtletaPage = (a) => renderPug('emd', { t: a });
exports.formExamePage = (exame) => renderPug('form', { exame: exame });