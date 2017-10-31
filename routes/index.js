var express = require('express');
var app = express();
var i18n = require('i18n');
var path = require('path');


app.set('views', app.get('views') + '/default/pages/');

app.get('/', function (req, res) {
    console.log('Views', app.get('views'));
    
    res.render('index', {i18n: res});
});

app.get('/contact', function (req, res) {
    res.render('contact', {i18n: res})
});

module.exports = app;