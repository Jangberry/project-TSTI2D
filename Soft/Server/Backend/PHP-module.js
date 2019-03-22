"use strict";

class ExecPHP {

    constructor() {
        this.phpPath = 'php';
        this.phpFolder = '';
        const os = require("os");
        this.os = os.type();
    }

    parseFile(fileName, args, callback) {
        let realFileName = this.phpFolder + fileName;   // Passage de chemin relatif a absolu
        if (this.os === "Windows_NT") {
            realFileName = realFileName.replace("/", "\\"); // Remplace "/" par "\" pour la compatibilité avec windows
        }

        const exec = require('child_process').exec;
        let cmd = '"' + this.phpPath + '" "' + realFileName + '"';  // initialise la chaine de caractere de la commande

        // TODO : enregistrer les arguments dans $_GET ou $_POST comme apache

        if (args) {
            if (args.log !== undefined && args.pass !== undefined) {    // Cas de login.php
                cmd += " " + args.log + " " + args.pass;
            } else if (args.logged !== undefined) { // Cas de accueil.php
                cmd += " " + args.logged;
            } else if (typeof(args) != "object") {  // Cas general
                cmd += " " + args;
            }
        }

        exec(cmd, function (error, stdout, stderr) {
            console.log(cmd);
            if (error) {            // En cas d'erreur (404 compris)
                console.log(error);
                console.log(stdout);
                console.log(stderr);
                callback(null, true);
            } else {
                callback(stdout, null);
            }
        });
    }
}

module.exports = new ExecPHP();