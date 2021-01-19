const nodemailer = require('nodemailer');
const configs = require('../../configs');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: configs.EMAIL_LOGIN,
        pass: configs.EMAIL_PASS
    }
});

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports.prepareAndSendMail = (options: any) => {
    const pathToEmails = './src/utils/emails/';
    fs.readFile(`${pathToEmails}${options.template}.html`, 'utf8', (err: any, rawHtml: any) => {
        if (err) {
            console.log(err);
            return;
        }
        const emailInfo = {
            from: `Vlad theater support <${configs.EMAIL_LOGIN}>`,
            to: options.to,
            subject: options.subject,
            html: prepareHtml(rawHtml, options.data),
            attachments: [{
                filename: 'logoImg.png',
                path: `${pathToEmails}logoImg.png`,
                cid: 'logoImg'
            }]
        };
        sendMail(emailInfo);
    });
};

function prepareHtml(rawHtml: string, object: any): string {
    return rawHtml.replace(new RegExp(`{{.+?}}`, 'g'), (subString) => {
        const key = subString.replace('{{', '').replace('}}', '');

        return object[key];
    });
}

function sendMail(emailInfo: any) {
    transporter.sendMail(emailInfo, function (error: any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
