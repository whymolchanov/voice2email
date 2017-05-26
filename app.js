const MailSender = require('./src/MailSender.js');
const http = require('http');
const PORT = 3000;
const server = http.createServer();

server.on('request', (req) => {
    console.log('requested');
    let body = [];
    if (req.method === 'POST') {
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            MailSender.sendMail(body.title, body.mailBody);
        });
    }

});

server.listen(PORT, () => {
    console.log(`server started on {$PORT} port`);
});
