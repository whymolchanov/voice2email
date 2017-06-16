/**
 * @fileoverview Abstraction above GET and POST request parameters retrivement.
 * Check request method and use appropriate ServerUtilities utility function.
 */

const serverUtilities = require('./ServerUtilities/ServerUtilities.js');

/**
 * @param {http.IncomingMessage} request
 * @return {Promise}
 */
function parse(request) {
    let method = request.method;

    if (method === 'GET') {
        return serverUtilities.getQueryParams(request);
    } else if (method === 'POST') {
        return serverUtilities.getPostRequestBody(request);
    }
}

module.exports = {
    parse: parse
}
