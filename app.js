/* Importar as configurações do servidor */
var app = require('./config/server');
/* Configurar a porta de escuta da aplicação */
var server_http = app.listen(8080, function() {
	console.log('Servidor HTTP/WebSocket Chat online');
})
var socket_io = require('socket.io').listen(server_http);
/* Definir uma variavel global para ser utilizadas nas Controllers */
app.set('socket_io', socket_io);

/* Criar conexão por WebSocket */
socket_io.on('connection', function(socket) {

	console.log('Client conectou');

	socket.on('disconnect', function(socket_result) {
		var mensagem = {nome: 'Usuario x', mensagem: 'Saiu do chat.'};
		socket.broadcast.emit('mensagem', mensagem);
	})
	socket.on('mensagem', function (data) {

		/* Enviar a mensagem */
		var mensagem = {nome: data.nome, mensagem: data.mensagem};
		socket.emit('mensagem', mensagem);
		socket.broadcast.emit('mensagem', mensagem);

		/* Atualizar os participantes */
		if (parseInt(data.status_apelido) == 0) {
			socket.emit('participantes', {nome: data.nome});
			socket.broadcast.emit('participantes', {nome: data.nome});
		}

	});

});
/*
socket.emit = Faz o pedido da solicitação.
socket.on = Escuta as solicitações.
 */