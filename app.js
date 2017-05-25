const nodemailer = require('nodemailer');
const config = require('./config/config.js')
const http = require('http');
const PORT = 3000;
const server = http.createServer();

let transporter = nodemailer.createTransport(
    {
        service: config.service,
        auth: {
            user: config.auth.user,
            pass: config.auth.pass
        }
    }
);

function sendMail(title, body) {

    let mailOptions = {
        from: config.sender,
        to: config.receiver,
        subject: title,
        text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message is sent');
    });

}

server.on('request', (req) => {
    console.log('requested');
    let body = [];
    if (req.method === 'POST') {
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            sendMail(body.title, body.mailBody);
        });
    }

});

server.listen(PORT, () => {
    console.log('server started on {$PORT} port');
});
