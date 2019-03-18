// ===========================================
// == Chargement des modules
// ===========================================

const mysql = require('mysql');
const token = require('./token')


// ===========================================
// == Création de la connexion à MySQL
// ===========================================

// Création connexion
const connection = mysql.createConnection({
    host: token.host,
    user: token.user,
    password: token.password,
    database: token.database
});
connection.connect();
require('./util/logger').success('Connexion à la BDD réussie')

// Export de la connexion
module.exports = connection;