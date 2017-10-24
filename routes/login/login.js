var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');



app.get('/authenticate', function (req, res) {

    let user = {
        login: 'admin',
        admin: false
    }

    if (user) {
        let payload = {
            admin: user.admin
        }

        let token = jwt.sign(payload, 'secret_token');

        res.json({success: true, user: user.login, token: token})
    }

});

app.post('/login', function (req, res) {
    
    console.log(req.body.login); //>>>????
    let login = req.body.login;
    let password = req.body.password;

    // request to Db

    setTimeout(function() {
        res.status(200).send({
            success: true,
            login: "login",
            password: "password"
        })
    }, 3000);

})

app.get('/login', function (req, res) {
    res.render('login', {i18n: res});
})

module.exports = app;