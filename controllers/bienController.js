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

exports.biensasc = function (req, res) {
    db.query(`SELECT * FROM bien ORDER BY prix_bien ASC`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'bien', 'bien', results.length);
    })
}

exports.biendesc = function (req, res) {
    db.query(`SELECT * FROM bien ORDER BY prix_bien DESC`, function (error, results, fields) {
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
    db.query(`INSERT INTO bien (type_bien, nom_bien, ville_bien, adresse1_bien, quartier_bien, prix_bien, surface_bien, piece_bien, charge_bien, date_constructionbien, cp_bien, adresse2_bien, ref_personne, autorise_bien) VALUES
    ('${req.query.type}', '${req.query.nom}', '${req.query.ville}', '${req.query.add1}', '${req.query.quartier}', '${req.query.prix}', ${req.query.surface}, ${req.query.piece}, ${req.query.charge}, '${req.query.date}', '${req.query.cp}', '${req.query.add2}', ${req.query.refpers}, 'En attente')`, function (error, results, fields) {
            if (error) return util.sendError(res);
            util.sendResult(res, results, 'bien', 'bien', results.length);
        })
}

exports.change_autorisations = function (req, res) {
    db.query(`UPDATE bien SET autorise_bien = '${req.query.autorise}' WHERE reference_bien = ${req.query.id_bien}`);
}


exports.removeBien = function (req, res) {
    db.query(`DELETE FROM bien WHERE reference_bien = ${req.query.id}`);
}

exports.bienFiltre = function (req, res) {
    var query = `SELECT * FROM bien`
    if (req.query.type || req.query.surfacemax || req.query.surfacemin || req.query.piece) query = query + ` WHERE `;
    if (req.query.type) {
        query = query + `type_bien = '${req.query.type}'`;
    }
    if (req.query.surfacemin) {
        if (req.query.type) query = query + ` AND surface_bien > ${req.query.surfacemin}`;
        else query = query + `surface_bien > ${req.query.surfacemin}`;
    }
    if (req.query.surfacemax) {
        if (req.query.type || req.query.surfacemax) query = query + ` AND surface_bien < ${req.query.surfacemax}`;
        else query = query + `surface_bien < ${req.query.surfacemax}`;
    }
    if (req.query.piece) {
        if (req.query.type || req.query.surfacemax || req.query.surfacemin) query = query + ` AND piece_bien = ${req.query.piece}`;
        else query = query + `piece_bien = ${req.query.piece}`;
    }
    db.query(query, function (error, results, fields) {
        console.log(query)
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'bien', 'bien', results.length);
    });
}