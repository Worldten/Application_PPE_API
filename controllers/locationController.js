// ===========================================
// == Chargement des modules
// ===========================================

// Fonctions utiles
const util = require('../util/controllerUtil');
// Connexion bdd
const db = require('../database');


exports.location = function (req, res) {
    // Get from ID
    if (req.query.id) {
        return db.query(`SELECT * FROM location WHERE ref_loc = ${req.query.id}`, function (error, results, fields) {
            if (error) return util.sendError(res);
            util.sendResult(res, results, 'message', 'message', results.length);
        });
    }
}

exports.locations = function (req, res) {
    // Get from ID
    return db.query(`SELECT * FROM location WHERE ref_loc = ${req.query.id}`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'message', 'message', results.length);
    });
}

exports.add_location = function (req, res) {
    db.query(`INSERT INTO location(date_contrat_loc, date_entree_loc, date_sortie_loc, etat_paiement_frais_loc, reference_bien, ref_personne) VALUES('${req.query.contrat}', '${req.query.entree}', '${req.query.sortie}', '${req.query.paiement}', ${req.query.id_bien}, ${req.query.id_personne})`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'message', 'message', results.length);
    });
}

exports.removeLocation = function (req, res) {
    db.query(`DELETE FROM location WHERE ref_loc = ${req.query.id}`);
}