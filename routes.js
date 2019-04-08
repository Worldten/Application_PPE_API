module.exports = function (app) {
    // ===========================================
    // Chargement des controllers
    // ===========================================
    const bienController = require('./controllers/bienController');
    const userController = require('./controllers/userController');
    const locationController = require('./controllers/locationController');
    const messageController = require('./controllers/messageController');


    // ===========================================
    // == LOCATION Routes
    // ===========================================

    // GET (récupération d'informations)

    // Renvoie toutes les informations d'un bar précis
    app.route('/location').get(locationController.location);
    // Renvoie une liste de bars avec toutes leurs informations
    app.route('/locations').get(locationController.locations);



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

    // Login
    app.route('/login').post(userController.login);



    // ===========================================
    // == BIEN Routes
    // ===========================================

    // GET (récupération d'informations)

    // Renvoie toutes les informations d'un bien précise
    app.route('/bien').get(bienController.bien);

    // Renvoie une liste de biens avec toutes leurs informations
    app.route('/biens').get(bienController.biens);

    // Renvoie toutes les informations des biens lié a un client
    app.route('/bien/client').get(bienController.bien_client)

    //POST (ajout d'information)
    app.route('/add_bien').post(bienController.add_bien);

    // ===========================================
    // == MESSAGE Routes
    // ===========================================

    // GET (récupération d'informations)
    app.route('/messages').get(messageController.messages);

    //Message by id
    app.route('/message').get(messageController.message);

    // Message by bien
    app.route('/bien/messages').get(messageController.messages_by_bien);

    // Ajout message
    app.route('/new_message').post(messageController.newMessage);

    // ===========================================
    // == DEFAULT Routes
    // ===========================================

    // Route par défaut (Error 404 - not found) 
    app.get('*', function (req, res) {
        res.send("404 - not found");
    });
}