// ===========================================
// == Chargement des modules
// ===========================================

// Chargement d'express
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
// Modules pour les logs
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const logger = require('./util/logger');



// =============================================
// == Chargement setup de log
// =============================================

// Vérification existance du dossier
const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Création du flux
var accessLogStream = rfs('access.log', {
    interval: '1d', // créer 1 fichier / jour
    path: logDirectory
});

app.logger = logger;


// ===========================================
// == Lancement de l'application
// ===========================================

// Paramétrage
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Activation CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// Lancement du serveur
const server = app.listen(process.env.PORT || 8082, function () {
    const port = server.address().port;
    app.logger.success(`API Bar'O-mètre tourne sur le port ${port}`);
});

// Chargement des routes
const routes = require('./routes.js');
routes(app);