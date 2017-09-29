var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var Twig = require("twig");
var i18n = require('i18n');

i18n.configure({
  locales: [
    'en', 'pl'
  ],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  cookie: 'i18n'
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(cookieParser("i18n"));

app.use(session({
    secret: "i18n",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(i18n.init);


// views is directory for all template files
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'twig');



app.get('/', function (req, res) {

  if(req.cookies.i18n !== undefined) {
    res.setLocale(req.cookies.i18n);
  } else {
    res.setLocale('en');
  }
  
  res.render('index', {
    i18n: res
  });

});

app.get('/contact', function (req, res) {
  res.render('contact', {
    i18n: res
  })
});

app.get('/pl', function (req, res) {
  res.cookie('i18n', 'pl');
  res.redirect('/')
});

app.get('/en', function (req, res) {
  res.cookie('i18n', 'en');
  res.redirect('/')
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
