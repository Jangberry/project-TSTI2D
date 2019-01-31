"use strict";
class ExecPHP {

  constructor() {
    this.phpPath = 'D:\\Program Files\\php\\php.exe';
    this.phpFolder = '';
    const os = require("os");
    this.os = os.type();
  }

  parseFile(fileName, callback) {
    var realFileName = this.phpFolder + fileName;
    if(this.os == "Windows_NT"){
      realFileName = realFileName.replace("/", "\\");
    }

    console.log('parsing file: ' + realFileName);

    var exec = require('child_process').exec;
    var cmd = '"' + this.phpPath + '" "' + realFileName + '"';

    exec(cmd, function (error, stdout, stderr) {
      if (error){
        console.log(error);
      }
      callback(stdout);
    });
  }
}

module.exports = function () {
  return new ExecPHP();
};