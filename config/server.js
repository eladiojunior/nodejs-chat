/* Importar o módulo do framework express */
var express = require('express');

/* Importar o módulo do express-layout */
var express_layout = require('express-ejs-layouts');

/* Importar o módulo do consign */
var consign = require('consign');

/* Importar o módulo do body-parser */
var body_parser = require('body-parser');

/* Iniciar objeto express  */
var app = express();

/* Configurar as variáveis da 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.set('layout', 'layouts/layout');
app.set("layout extractScripts", true);

app.use(express_layout);

/* Configurar o middleware express.static  */
app.use(express.static('./app/public'));

/* Configurar o middleware body-parser */
app.use(body_parser.urlencoded({extended: true}));

/* Configurar o autoload das rotas, models e controllers para o objeto app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* Exportar objeto APP/Express */
module.exports = app;