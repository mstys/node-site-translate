var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');

var Twig = require("twig");

var i18n = require('i18n');

var i18nMiddleware = require('./i18n-middleware.js');
var routes = require('./routes/index.js');
var routesLogin = require('./routes/login/login.js');
var routesApi = require('./routes/api/api.js');
// var login = require('./routes.js');

// var jws = require('jws');
// var jwt = require('express-jwt');


var app = express();

/**
 * i18n configuration
 */
var i18n_config = {
  locales: [
    'en', 'pl'
  ],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  cookie: 'i18n'
}

i18nMiddleware.configure(app, i18n, i18n_config);



/**
 * Initial setup
 */

app.use(express.static(__dirname + '/public'));
app.use(cookieParser("i18n"));
app.use(session({
  secret: "i18n",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}));

/**
 * Set body parser to get params from POST and URL parameters
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Translation module setup
 */
app.use(i18n.init);
app.use(i18nMiddleware.init);

/**
 * Twig engine setup
 */
app.set('view engine', 'twig');
app.set('views', __dirname + '/views/');

/**
 * Router
 */
app.use(i18nMiddleware.url(app, '/'), routes);
app.use(i18nMiddleware.url(app, '/contact'), routes);
app.use(routesLogin);
app.use('/api', routesApi);

/**
 * Dev setup
 */
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
