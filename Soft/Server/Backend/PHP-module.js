"use strict";

class ExecPHP {

    constructor() {
        this.phpPath = 'D:\\Program Files\\php\\php.exe';
        this.phpFolder = '';
        const os = require("os");
        this.os = os.type();
    }

    parseFile(fileName, args, callback) {
        let realFileName = this.phpFolder + fileName;
        // noinspection EqualityComparisonWithCoercionJS
        if (this.os === "Windows_NT") {
            realFileName = realFileName.replace("/", "\\");
        }

        const exec = require('child_process').exec;
        let cmd = '"' + this.phpPath + '" "' + realFileName + '"';

        if (args) {
            if (args.log && args.pass) {
                cmd += " " + args.log + " " + args.pass;
            } else if (args.logged !== undefined) {
                cmd += " " + args.logged;
            } else {
                cmd += " " + args;
            }
        }

        exec(cmd, function (error, stdout, stderr) {
            console.log(cmd);
            if (error) {
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