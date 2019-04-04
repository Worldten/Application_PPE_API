// ===========================================
// == Chargement des modules
// ===========================================

// Fonctions utiles
const util = require('../util/controllerUtil');
// Connexion bdd
const db = require('../database');


exports.bien = function (req, res) {
    // Vérification des paramètres
    if (!req.query.id) res.send("Veuillez spécifiez un bien")

    // Get from ID
    if (req.query.id) {
        return db.query(`SELECT * FROM bien WHERE reference_bien = ${req.query.id}`, function (error, results, fields) {
            if (error) return util.sendError(res);
            util.sendResult(res, results, 'bien', 'bien', results.length);
        });
    }
}

exports.biens = function (req, res) {
    db.query(`SELECT * FROM bien`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'bien', 'bien', results.length);
    })
}

exports.bien_client = function (req, res) {
    db.query(`SELECT * FROM bien WHERE ref_personne = ${req.query.id}`, function (error, results, field) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'bien', 'bien', results.length)
    })
}

exports.add_bien = function (req, res) {
    if (!req.query.add2) req.query.add2 = "";
    console.log(req.query)
    db.query(`INSERT INTO bien (type_bien, nom_bien, ville_bien, adresse1_bien, quartier_bien, prix_bien, surface_bien, piece_bien, charge_bien, date_constructionbien, cp_bien, adresse2_bien, ref_personne) VALUES
    ('${req.query.type}', '${req.query.nom}', '${req.query.ville}', '${req.query.add1}', '${req.query.quartier}', '${req.query.prix}', ${req.query.surface}, ${req.query.piece}, ${req.query.charge}, '${req.query.date}', '${req.query.cp}', '${req.query.add2}', ${req.query.refpers})`, function (error, results, fields) {
            if (error) return util.sendError(res);
            util.sendResult(res, results, 'bien', 'bien', results.length);
        })
}