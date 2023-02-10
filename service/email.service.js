const nodeMailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {config} = require('../config');
const emailTemplate = require('../emailTemplate');
const {ApiError} = require("../error");

const sendEmail = async (emailReceiver, emailAction, locals) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.NO_REPLY_EMAIL,
            pass: config.NO_REPLY_EMAIL_PASSWORD,
        },
    });

    const templateInfo = emailTemplate[emailAction];

    if (!templateInfo) {
        throw new ApiError('Wrong template', 400);
    }

    const emailCreator = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'emailTemplate'),
        },
    });

    const html = await emailCreator.render(templateInfo.templateName, locals);

    transporter.sendMail({
        from: 'No reply',
        to: emailReceiver,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendEmail,
};
