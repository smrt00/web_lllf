import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import nunjucks from "nunjucks"

// Constants
const IN = process.env.IN
let PORT = 3000
;
if (IN == 'dev') PORT = 3000            // dev or prod

// reiniciar plantillas con ctrl-s
let WATCH = false
if (IN == 'dev') WATCH = true


// server
const server = express()
server.use(express.static('public'));

// directorio de plantillas con nunjucks
const dir_views = new URL('./views', import.meta.url).pathname;
//let dir_views = './views'
nunjucks.configure(dir_views, {
  autoescape: true,
  express: server,
  watch: WATCH  //dev
});


// language del navegador
server.use(function (req, res, next) {
  const languaes   = req.acceptsLanguages()
	const lang_codes = languaes.map(l => l.slice(0,2))
	req.lang = 'en'
	//console.log(lang_codes)
	// preferencia primera lengua, aunque tenga español                 
	if ('es' == lang_codes[0]) req.lang = 'es'
  next();
});


// paths
server.get(/^\/$|^\/home/, (req, res) => {
  res.render(`${req.lang}/home.html`);
});

server.get(/^\/antecedentes/, (req, res) => {
  res.render(`${req.lang}/antecedentes.html`);
});

server.get(/^\/corpues/, (req, res) => {
  res.render(`${req.lang}/corpues.html`);
});

server.get(/^\/herramientas/, (req, res) => {
  res.render(`${req.lang}/herramientas.html`);
});

server.get(/^\/proyectos/, (req, res) => {
  res.render(`${req.lang}/proyectos.html`);
});

server.get(/^\/recursos/, (req, res) => {
  res.render(`${req.lang}/recursos.html`);
});

server.get(/^\/plantilla-proyecto/, (req, res) => {
  res.render(`${req.lang}/plantilla-proyecto.html`);
});

server.get(/^\/actualidad/, (req, res) => {
  res.render(`${req.lang}/actualidad.html`);
});

server.get(/^\/personal/, (req, res) => {
  res.render(`${req.lang}/personal.html`);
});

server.get(/^\/publicaciones/, (req, res) => {
  res.render(`${req.lang}/publicaciones.html`);
});

server.get(/^\/plantilla-publicaciones/, (req, res) => {
  res.render(`${req.lang}/plantilla-publicaciones.html`);
});

server.get(/^\/publicaciones-2022/, (req, res) => {
  res.render(`${req.lang}/publicaciones-2022.html`);
});

server.get(/^\/publicaciones-2001/, (req, res) => {
  res.render(`${req.lang}/publicaciones-2001.html`);
});

server.listen(PORT, () => {
	console.log(`🚀 Server ejecutandose en el puerto ${PORT}`)
});