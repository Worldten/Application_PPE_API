module.exports = function (app) {
    // ===========================================
    // Chargement des controllers
    // ===========================================
    const barController = require('./controllers/bienController');
    const userController = require('./controllers/userController');
    const commentController = require('./controllers/locationController');


    // ===========================================
    // == LOCATION Routes
    // ===========================================

    // GET (récupération d'informations)

    // Renvoie toutes les informations d'un bar précis
    // app.route('/get_location').get(barController.get_bar);
    // Renvoie une liste de bars avec toutes leurs informations
    // app.route('/get_locations').get(barController.get_bars);



    // ===========================================
    // == UTILISATEURS Routes
    // ===========================================

    // GET (récupération d'informations)

    // Renvoie toutes les informations d'un utilisateur précis
    app.route('/user').get(userController.user);

    // Renvoie une liste d'utilisateurs avec toutes leurs informations
    app.route('/users').get(userController.users);

    // Ajoute un utilisateur
    app.route('/add_user').post(userController.add_user);



    // ===========================================
    // == BIEN Routes
    // ===========================================

    // GET (récupération d'informations)

    // Renvoie toutes les informations d'un commentaire précise
    // app.route('/get_bien').get(commentController.get_comment);

    // Renvoie une liste de commentaires avec toutes leurs informations
    // app.route('/get_biens').get(commentController.get_comments);



    // ===========================================
    // == DEFAULT Routes
    // ===========================================

    // Route par défaut (Error 404 - not found) 
    app.get('*', function (req, res) {
        res.send("404 - not found");
    });
}