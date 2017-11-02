var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var Cookies = require("cookies");

app.set('views', app.get('views') + '/default/pages/');

app.post('/authenticate', function (req, res) {

    const login = req.body.login;
    const password = req.body.password;

    console.log(req.body);
    console.log(req.body.login);
    console.log(login, password);

    let user = {
        login: 'admin',
        password: 'admin',
        admin: false
    }

    if (login == user.login && password == user.password) {
        let payload = {
            admin: user.admin
        }

        let token = jwt.sign(payload, 'secret_token');

        res
            .status(200)
            .send({success: true, user: user.login, token: token});

    } else {
        res
            .status(403)
            .send({success: false, message: 'Wrong data access'});

    }

});

app.post('/login', function (req, res) {

    // request to Db

    setTimeout(function () {
        res
            .status(200)
            .send({success: true, login: login, password: password})
    }, 3000);

});

// app.get('/logout', function (req, res, next) {

// });

app.get('/login', function (req, res, next) {

    let token;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req
            .headers
            .authorization
            .split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    } else if (req.cookies.token) {
        token = req.cookies.token;
    } else {
        token = null
    }

    if (token) {

        jwt
            .verify(token, 'secret_token', function (err, decoded) {
                if (err) {
                    next();
                } else {
                    //redirect to /api/
                    res.redirect('/api/');
                }
            })
    } else {
        next();
    }
}, function (req, res) {
    res.render('login', {i18n: res});
})

module.exports = app;