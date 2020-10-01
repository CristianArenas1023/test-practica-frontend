var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routerApi = require('./routes/api');

var app = express();

app.set("env",  (process.env.ENVIROMENT_MODE || "dev") );

app.use(logger(app.get("env")));

// Ver como pasar parametros de ip:puerto clietne en comando

const allowedDomain =  (process.env.CORS_ALLOWED_DOMAIN || "http://localhost:3003");

// Permite CORS para sólo el dominio donde corre la app frontend.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `${allowedDomain}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Ruta de API.
app.use('/api', routerApi);

app.get('/', function (req, res) {
  res.status(200).send('<i><u>Servidor corriendo...</u></i>');
})

// Redireccionar cualquier página no deifina en routes como 404 al manejador de errores.
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejar errores
app.use(function(err, req, res, next) {
  let status = (err.status || 500);
  let output = `<h1>Error ${status}</h1>`;
  if(req.app.get('env')  === 'dev' ){
    output += `<pre>${err.stack}</pre>`;
  }
  res.status(status).send(output);
});

module.exports = app;
