// ===========================================
// == Chargement des modules
// ===========================================

// Fonctions utiles
const util = require('../util/controllerUtil');
// Connexion bdd
const db = require('../database');


exports.messages = function (req, res) {
    return db.query(`SELECT * FROM message`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'message', 'message', results.length);
    });
}

exports.message = function (req, res) {
    return db.query(`SELECT * FROM message WHERE id_message = ${req.query.id}`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'message', 'message', results.length);
    });
}

exports.messages_by_bien = function (req, res) {
    return db.query(`SELECT * FROM message WHERE reference_bien = ${req.query.id_bien}`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'message', 'message', results.length);
    });
}

exports.newMessage = function (req, res) {
    if (req.query.texte != "" && req.query.id_personne != "" && req.query.id_bien != "") db.query(`INSERT INTO message(texte_message, ref_personne,reference_bien) VALUES ('${req.query.texte}', '${req.query.id_personne}', '${req.query.id_bien}') `)
}