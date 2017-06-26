/**
 * @fileoverview Some utilities for server. There is no reason to take Express
 * for such small task.
 */

const url = require('url');
const http = require('http');
const winston = require('../configuredWinston.js');

/**
 * Hide work that must be done to get a request body.
 * @param {http.IncomingMessage} request
 * @see https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_incomingmessage
 * @return {Promise}
 */
function getPostRequestBody(request) {
    return new Promise((resolve, reject) => {
        winston.debug('ServerUtilities#getPostRequestBody running');
        if (request.method !== 'POST') {
            winston.warn('Request object is not POST method');
            return reject('Request object is not POST method');
        }

        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        });
        request.on('end', () => {
            winston.debug('Request body parsing is over');
            let parsedBody = JSON.parse(Buffer.concat(body).toString());
            resolve(parsedBody);
            winston.debug('ServerUtilities#getPostRequestBody resolved');
        });
    });
}

/**
 * Extracts query parameters from request object.
 * @param {http.IncomingMessage} request
 * @return {Promise}
 */
function getQueryParams(request) {
    return new Promise((resolve, reject) => {
        winston.debug('ServerUtilities#getQueryParams running');
        if (!(request instanceof http.IncomingMessage)) {
            winston.warn('Request isn\'t an instance of http.IncomingMessage');
            return reject(new Error('request not an instance of http.IncomingMessage'));
        }
        let queryParamsObject = url.parse(request.url, true).query;
        resolve(queryParamsObject);
        winston.debug('ServerUtilities#getQueryParams stop running');
    })
}

module.exports = {
    getPostRequestBody: getPostRequestBody,
    getQueryParams: getQueryParams
}
