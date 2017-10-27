var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');


app.set('views', './views/pages/');

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

    if(login == user.login && password == user.password) {
        let payload = {
            admin: user.admin
        }

        let token = jwt.sign(payload, 'secret_token');

        res.json({success: true, user: user.login, token: token});

    } else {
        res.json({success: false, message: 'Wrong data access'});

    }

});

app.post('/login', function (req, res) {
    


    // request to Db

    setTimeout(function() {
        res.status(200).send({
            success: true,
            login: login,
            password: password
        })
    }, 3000);

})

app.get('/login', function (req, res) {
    res.render('login', {i18n: res});
})

module.exports = app;