const http = require('http');
const PORT = 3000;
const server = http.createServer();

const MailSender = require('./src/MailSender.js');
const ServerUtilities = require('./src/ServerUtilities.js');

server.on('request', (req, res) => {
    ServerUtilities.getPostRequestBody(req)
        .then(MailSender.sendMail, (errorMessage) => {
            console.log(errorMessage);
        })
        .then(() => {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end('OK');
        }, () => {
            res.writeHead(500, {'Content-type': 'text/plain'});
            res.end('Email was not send');
        });
});

server.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
});
