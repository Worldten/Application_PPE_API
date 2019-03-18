// ===========================================
// == Fonctions utiles
// ===========================================

// FONCTION RESULTATS
exports.sendResult = async function (res, results, table, type, total) {
    var resultJson = JSON.stringify(results);
    resultJson = JSON.parse(resultJson);
    var apiResult = {};

    apiResult.meta = {
        table: table,
        type: type,
        total: total,
    }

    apiResult.data = resultJson;

    res.json(apiResult);
}


// FONCTION ERREURS
exports.sendError = function (res) {
    var apiResult = {};
    apiResult.meta = {
        table: 'table',
        type: 'collection',
        total: 0
    }
    apiResult.data = [];
    res.json(apiResult)
}