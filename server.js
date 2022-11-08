const tutorial = 'https://www.youtube.com/watch?v=18qA61bpfUs';
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('./edsConfig.js');
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

function send_mail(name, recipient) {
    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.user,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken,
        },
    });

    const mail_options = {
        from: `Ed Poplet <${config.user}>`,
        to: recipient,
        replyTo: getUserEmail(),
        subject: getSubject(),
        html: get_html_message(name),
    };

    transport.sendMail(mail_options, function (error, result) {
        if (error) {
            console.log('Error', error);
        } else {
            console.log('Success', result);
        }
        transport.close();
    });
}
function getUserEmail() {
    return 'shodbyed+replytome@gmail.com';
}
function getSubject() {
    return 'outside subject is working';
}
function get_html_message(name) {
    return `
    <div>
    <h3> ${name}, another test email</h3>
    <p> email is working still</p>
    </div>
    `;
}

send_mail('ed', 'shodbyed@gmail.com');
