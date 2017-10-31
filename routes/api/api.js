var express = require('express');
var app = express();
var i18n = require('i18n');
var jwt = require('jsonwebtoken');

var routerApi = express.Router();



routerApi.use(function (req, res, next) {

    let token;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    } else if (req.cookies.token) {
        token = req.cookies.token;
    } else {
        token = null
    }

    if (token) {

        jwt.verify(token, 'secret_token', function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Invalid token'})
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res
            .status(403)
            .render('dashboard/pages/403', {});
    }

});

routerApi.get('/', function (req, res) {
    res.render('dashboard/pages/index');

})

routerApi.get('/users', function (req, res) {

    res.status(200).send({
            success: true,
            message: {
                name: 'Adam'
            }
        })

})




module.exports = routerApi;