// ===========================================
// == Chargement des modules
// ===========================================

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const chalk = require('chalk');
const rfs = require('rotating-file-stream');


// ===========================================
// == Fonctions
// ===========================================

/**
 * Log
 */
exports.log = (message, type = "") => {
    const timestamp = `${chalk.black.bgWhite(`[${moment().format("DD-MM-YYYY HH:mm:ss")}]`)}`;
    switch (type) {
        case "verbose":
            return console.log(`${timestamp} ${type.toUpperCase()} ${message}`);
        case "success":
            return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${message}`);
        case "warn":
            return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${message}`);
        case "error":
            return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${message}`);
        default:
            break;
    }
}

/**
 * Exportation de méthodes de racourcis
 */
exports.verbose = (...args) => this.log(...args, "verbose");
exports.success = (...args) => this.log(...args, "success");
exports.warn = (...args) => this.log(...args, "warn");
exports.error = (...args) => this.log(...args, "error"); 