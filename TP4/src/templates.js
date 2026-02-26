const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`src/views/${fileName}.pug`, data);
}

exports.analisesListPage = (lista_analises) => renderPug('index', { list: lista_analises });
exports.analiseAtletaPage = (a, message) => renderPug('emd', { t: a , message: message });
exports.formExamePage = (exame) => renderPug('form', { exame: exame });
exports.statsPage = (generos, modalidades, clubes, resultados, federados) => renderPug('stats', { generos, modalidades, clubes, resultados, federados });
exports.deletedPage = (t, message) => renderPug('deleted', { t: t , message: message });