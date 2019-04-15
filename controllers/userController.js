// ===========================================
// == Chargement des modules
// ===========================================

// Fonctions utiles
const util = require('../util/controllerUtil');
const bcrypt = require('bcrypt')
// Connexion bdd
const db = require('../database');


exports.user = function (req, res) {
    if (!req.query.id) return res.send("y'a R");
    db.query(`SELECT * FROM personne WHERE ref_personne = ${req.query.id}`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'personne', 'personne', results.length);
    })

}

exports.users = function (req, res) {
    // Vérification des paramètres
    db.query(`SELECT * FROM personne`, function (error, results, fields) {
        if (error) return util.sendError(res);
        util.sendResult(res, results, 'personne', 'personne', results.length);
    })
}

exports.add_user = function (req, res) {
    // db.query(`SELECT 1 FROM personne WHERE mail_personne = '${req.query.mail}'`, function (erreur, resultats, champs) {
    //     if (resultats.length == 1) {
    //         return util.sendError(res);
    //     } else {
    db.query(`INSERT INTO personne (adresse1_personne, categorie_personne, tel_personne, prenom_personne, age_personne, mail_personne, adresse2_personne, cp_personne, nom_personne, username_personne, mdp_personne) VALUES
            ('${req.query.add1}', '${req.query.categorie}', '${req.query.tel}', '${req.query.prenom}', ${req.query.age}, '${req.query.mail}', '${req.query.adresse2}', '${req.query.cp}', '${req.query.nom}', '${req.query.username}', '${req.query.mdp}')`, function (error, results, fields) {
            if (error) return util.sendError(res);
            util.sendResult(res, results, 'personne', 'personne', results.length);
        })
}
// })

exports.login = function (req, res) {
    db.query(`SELECT mdp_personne, ref_personne FROM personne WHERE mail_personne = '${req.query.mail}'`, function (error, results, fields) {
        if (error) return util.sendError(res);
        // util.sendResult(res, results, 'personne', 'personne', results.length);
        if (req.query.mdp == results[0].mdp_personne) {
            util.sendResult(res, results[0].ref_personne, 'personne', 'personne', results.length);
        }
    });
}

exports.change_info = function (req, res) {
    db.query(`UPDATE personne SET mdp_personne = '${req.query.mdp}' WHERE mail_personne = '${req.query.mail}`)
}

exports.removeUser = function (req, res) {
    db.query(`DELETE FROM personne WHERE ref_personne = ${req.query.id}`);
}