module.exports.home = function (application, request, response) {
    response.render('chat');
}
const { validationResult } = require('express-validator');
module.exports.iniciar = function (application, request, response) {

    const erros = validationResult(request);
    if (!erros.isEmpty()) {
        response.render('index', {validacao: erros});
        return;
    }

    var form = request.body;
    var socket = application.get('socket_io');
    socket.emit('mensagem', {nome: form.apelido, mensagem: 'Acabou de entrar no chat.'})

    response.render('chat', {apelido : form.apelido});

}