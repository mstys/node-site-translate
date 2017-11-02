var express = require('express');
var app = express();
var i18n = require('i18n');
var path = require('path');

var nodemailer = require('nodemailer');
var regex = require('regex-email');

app.set('views', app.get('views') + '/default/pages/');

app.get('/', function (req, res) {
    console.log('Views', app.get('views'));

    res.render('index', {i18n: res});
});

app.get('/contact', function (req, res) {
    res.render('contact', {i18n: res})
});

app.post('/form', function (req, res) {

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    console.log(name, email, message);
    console.log(name, email, message);

    let valid = true;
    let errors = [];

    if (name === undefined || name.length < 2) {
        valid = false;
        errors.push("Wrong name");
    }

    if (!regex.test(email)) {
        valid = false;
        errors.push("Wrong email");
    }

    if (!valid) {
        res
            .status(400)
            .send({
                status: false,
                message: errors.join(',')
            })
    } else {

        var mailOptions = {
            from: 'sender@server.com',
            to: email,
            subject: 'Test title',
            text: message,
            html: '<p>HTML version of the message</p>'
        };

        // Generate test SMTP service account from ethereal.email Only needed if you
        // don't have a real mail account for testing
        nodemailer.createTestAccount(function (err, account) {

            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email', port: 587, secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass // generated ethereal password
                }
            });

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com> Preview
                // URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });

        })

        res.status(200).send({
            status: true,
            message: "Email has been sended."
        })
    }

    
});

module.exports = app;