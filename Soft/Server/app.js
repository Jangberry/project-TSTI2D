'use strict';
var express = require('express');
var logger = require("morgan");
var execPHP = require("./Backend/PHP-module")();

var app = express();
execPHP.phpFolder = __dirname+"/Frontend";

if (process.argv[2] == "-v") {
    console.log("verbose");
    app.use(logger('dev'));
}

/*
 * 
 * req.query = les parametres de la requete
 * et   ``  .foo donne la valeur de ?foo
 *               mais il faut verifier: c'est une entree utilisateur
 *
 * 
 * req.params = les parametres "dans l'url" :
 *      pour "/test/:info"  dans le code
 *        et "/test/foo"    dans l'url
 *       req.params["info"] = "foo"
 * 
 */

// TODO : integrer interpreteurs
// TODO : faire API

app.get('/', function (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.sendFile(__dirname + "/Frontend/index.html");
})
    .get('/index', function (req, res) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.sendFile(__dirname + "/Frontend/index.html");
    })
    .get('/*.php', function (req, res, next) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        execPHP.parseFile(req.originalUrl, function (resultat) {
            res.write(resultat);
            res.end();
        });
    })
    .get('/*', function (req, res, next) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.sendFile(__dirname + "/Frontend" + req.path, {}, function (err) {
            next();
        });
    })
    .use(function (req, res) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.status(404).sendFile(__dirname + "/Frontend/404.html");
    });

app.listen(8080);