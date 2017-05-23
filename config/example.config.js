module.exports = {
    service: 'yandex', // see more here https://nodemailer.com/smtp/well-known/
    sender: 'mail@yandex.ru', // here is email that will be in FROM field of email
    receiver: 'supermail@gmail.com', // here is email that will be in TO field of email
    auth: {
        user: 'logindata', // login to account from whom will be send email
        pass: 'superpassword' // password for this account
    }
};
