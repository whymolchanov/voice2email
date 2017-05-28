/**
 * @fileoverview Some utilities for server. There is no reason to take Express
 * for such small task.
 */

/**
 * Hide work that must be done to get a request body.
 * @param {http.IncomingMessage} request
 * @see https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_incomingmessage
 * @return {Promise}
 */
function getPostRequestBody(request) {
    return new Promise((resolve, reject) => {
        if (request.method !== 'POST') {
            return reject('Request object is not POST method');
        }

        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        });
        request.on('end', () => {
            let parsedBody = JSON.parse(Buffer.concat(body).toString());
            resolve(parsedBody);
        });
    });
}

module.exports = {
    getPostRequestBody: getPostRequestBody
}
