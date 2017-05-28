const config = require('./config/config.js');
const http = require('http');
const server = http.createServer();
const PORT = config.port;
const ENDPOINT = config.endpoint;

const MailSender = require('./src/MailSender.js');
const ServerUtilities = require('./src/ServerUtilities.js');

server.on('request', (req, res) => {
    if (req.url === ENDPOINT) {
        ServerUtilities.getPostRequestBody(req)
            .then(MailSender.sendMail, (errorMessage) => {
                console.log(errorMessage);
            })
            .then(() => {
                res.writeHead(200, {'Content-type': 'text/plain'});
                res.end('OK');
            }, (error) => {
                res.writeHead(400, {'Content-type': 'text/plain'});
                res.end(`Email was not send, because of ${error}`);
            });
    } else {
        res.writeHead(400, {'Content-type': 'text/plain'});
        res.end('Bad endpoint request');
    }
});

server.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
});
