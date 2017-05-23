const nodemailer = require('nodemailer');
const config = require('./config/config.js')

let transporter = nodemailer.createTransport(
    {
        service: config.service,
        auth: {
            user: config.auth.user,
            pass: config.auth.pass
        }
    }
);

let mailOptions = {
    from: config.sender,
    to: config.receiver,
    subject: 'Test',
    text: 'Supertest'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message is sent');
});
