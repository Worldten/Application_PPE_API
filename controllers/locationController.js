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
            util.sendResult(res, results, 'commentaire', 'commentaire', results.length);
        });
    }
}