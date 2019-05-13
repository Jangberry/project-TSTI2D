'use strict';

// Chargement des modules

const logger = require("morgan");
const express = require('express');
const PHP = require("./Backend/PHP-module");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const randomstr = require("randomstring");
const fs = require("fs");

// Initialisation des variables

const app = express();
PHP.phpFolder = __dirname + "/Frontend";
let PORT = 8080;

if (process.argv[2] === "-v") {
    console.log("verbose");
    app.use(logger('dev'));
} else if (process.argv[0] === "sudo") {
    PORT = 80;
}

// Chargement des plug-ins Express

app.use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(session({"secret": randomstr.generate(20)}));

/*
 * Rappels variables Express
 *
 * req.query = les parametres de la requete
 * et   ``  .foo donne la valeur de ?foo
 * 
 * req.params = les parametres "dans l'url" :
 *      pour "/test/:info"  dans le code
 *        et "/test/foo"    dans l'url
 *       req.params["info"] = "foo"
 *
 * req.body = les parametres dans le POST :
 *      pour $_POST["foo"]  en PHP
 *           req.body.foo   en JS
 *
 */

let accueil = function (req, res, next) {
    let file;
    let args;
    if (req.session.logged) {
        file = "/index.php";
        args = req.query["balise"];
    } else {
        file = "/accueil.php";
        args = req.session;
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    PHP.parseFile(file, args, function (resultat, err) {
        if (err) {
            next();
        } else {
            res.write(resultat);
            res.end();
        }
    });
};

app.get('/', accueil)
    .get('/index*', accueil)
    .get('/accueil.*', accueil)
    .get('/*.php', function (req, res, next) {
        if (req.session.logged) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            PHP.parseFile(req.path, null, function (resultat, err) {
                if (err) {
                    next();
                } else {
                    res.write(resultat);
                    res.end();
                }
            });
        } else {
            next();
        }
    })
    .get('/database/:balise/:var/:value', function (req, res) {
        let database = require("./Backend/Database.json");
        database[req.params.balise][req.params.var] = req.params.value;
        fs.writeFile("Backend/Database.json", JSON.stringify(database), function (err) {
            if (err) {
                res.status(500);
            }
            res.end();
        });
    })
    .get('/*', function (req, res, next) {
        if (req.path.endsWith(".html")) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
        } else if (req.path.endsWith(".css")) {
            res.setHeader("Content-Type", "text/css; charset=utf-8");
        }
        res.sendFile(__dirname + "/Frontend" + req.path, {}, function (err) {
            if (err) {
                next();
            }
        });
    })
    .post('/login.php', function (req, res, next) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        PHP.parseFile(req.path, req.body, function (resultat, err) {
            if (err) {
                next();
            } else {
                req.session.logged = resultat.toString() === "﻿success";    // Sauvegarde dans les cookies si la personne est identifié
                res.setHeader("Location", "/");
                res.status(301).end();
            }
        });
    })
    .use(function (req, res) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.status(404).sendFile(__dirname + "/Frontend/404.html");
    });

app.listen(PORT);