const nodemailer = require('nodemailer');
const { mailCredentials } = require('./keys');

let mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    debug: true,
    auth: {
        type: 'OAuth2',
        clientId: mailCredentials.clientId,
        clientSecret: mailCredentials.clientSecret,
        refreshToken: mailCredentials.refreshToken
    }
});

mailer.verify((error,success) => {
    if(error){
        console.log(error);
    }else{
        console.log('Mailer is ready to deliver E-Mails');
    }
});

module.exports = mailer;
