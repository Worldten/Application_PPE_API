// ===========================================
// == Chargement des modules
// ===========================================

// Fonctions utiles
const util = require('../util/controllerUtil');
// Connexion bdd
const db = require('../database');


exports.get_comment = function (req, res) {
    // Vérification des paramètres
    // TODO: gérer les sorties d'erreur
    if (!req.query.id && !req.query.title) return res.send("y'a R");
    if (req.query.id && req.query.title) return res.send("UN SEUL PELO!");

    // Get from ID
    if (req.query.id) {
        return db.query(`SELECT * FROM commentaire AS c, utilisateur AS u, bar AS b WHERE commentaire_id = ${req.query.id} AND c.utilisateur_id = u.utilisateur_id AND c.bar_id = b.bar_id`, function (error, results, fields) {
            if (error) return util.sendError(res);
            util.sendResult(res, results, 'commentaire', 'commentaire', results.length);
        });
    }
}