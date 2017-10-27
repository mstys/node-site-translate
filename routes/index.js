var express = require('express');
var app = express();
var i18n = require('i18n');


app.set('views', __dirname + '/../views/pages/');

app.get('/', function (req, res) {
    res.render('index', {i18n: res});
});

app.get('/contact', function (req, res) {
    res.render('contact', {i18n: res})
});

module.exports = app;