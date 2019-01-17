'use strict';
var express = require('express');
var app = express();
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
 * 
 *      req.params["info"] = "foo"
 * 
 */

// TODO : integrer interpreteurs
// TODO : faire API

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/frontend/index.html");
})
    .get('/index', function (req, res) {
        res.sendFile(__dirname + "/frontend/index.html");
    })
    .get('/*', function (req, res, next) {
        res.sendFile(__dirname + "/frontend" + req.path, function (err) {
            if (err) {
                return next();
            }
        });
    })
    .use(function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send("····− −−−−− ····−");
    });

app.listen(8080);