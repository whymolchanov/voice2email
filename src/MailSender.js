/**
 * @fileoverview This class using to send emails from one email address to one email address.
 * For it's proper work user need to create right config and put it in a right place.
 * Put proper email subject and text into sendMail method and it's good to go.
 * Config must consist email provider name, login and password to email box from wich there will
 * be a email sending exist.
 */

const nodemailer = require('nodemailer');
const config = require('../config/config.js');

/**
 * @typedef {Object} UserAuth - users auth-data necessary to send email
 * @property {string} user - user email login
 * @property {string} pass - password
 */

/**
 * @typedef {Object} SenderConfig
 * @property {string} service - one of supported "well-known" services from nodemailer
 * @property {UserAuth} auth - users auth-data necessary to send email
 * @see https://nodemailer.com/smtp/well-known/
 */

/**
 * @typedef {Object} NodeMailerMailOptions - mail options necessary for nodemailer
 * @property {string} sender - from what email message must be sended
 * @property {string} receiver - to whom email message must be sended
 * @see https://nodemailer.com/message/
 */

/**
 * See what transport is in a link below
 * @see https://nodemailer.com/smtp/
 * @private
 * @param {SenderConfig} config
 * @return {Object} Mailer - nodemailer Mailer class instance
 */
function createTransport(config) {
    return nodemailer.createTransport(
        {
            service: config.service,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass
            }
        }
    );
}

/**
 * @private
 * @param {string} mailSubject
 * @param {string} mailBodyText
 * @return {NodeMailerMailOptions}
 */
function getMailOptions(mailSubject, mailBodyText) {
    return {
        from: config.sender,
        to: config.receiver,
        subject: mailSubject,
        text: mailBodyText
    }
}

/**
 * Check does emailText object has a title or body fields. If one or another
 * exist - we can send message, if no one is exist - we don't send message
 * @param {Object} emailText
 * @private
 * @return {boolean}
 */
function checkEmailTextValidity(emailText) {
    return (emailText.title || emailText.body) ? true : false;
}

/**
 * @public
 * @param {{subject: string, body: string}} emailText
 * @return {Promise}
 */
function sendMail(emailText) {
    if (!checkEmailTextValidity(emailText)) {
        return Promise.reject('no appropriate data');
    }
    let transport = createTransport(config);
    let mailOptions = getMailOptions(emailText.subject, emailText.body);

    return transport.sendMail(mailOptions);
}

module.exports = {
    sendMail: sendMail
}
