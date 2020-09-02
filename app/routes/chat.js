const { body } = require('express-validator');
module.exports = function (application) {
    application.get('/chat', function (request, response) {
        application.app.controllers.chat.home(application, request, response);
    });
    application.post('/chat',
        [
            body('apelido', 'Nome ou apelido obrigatório.').notEmpty(),
            body('apelido', 'Nome ou apelido deve conter entre 3 a 15 caracteres.').isLength({min: 3, max: 15})
        ],
        function (request, response) {
            application.app.controllers.chat.iniciar(application, request, response);
    });
}