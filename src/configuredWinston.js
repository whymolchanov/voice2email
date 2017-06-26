const winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.File, {filename: 'logs/log', timestamp: true});

module.exports = winston;
