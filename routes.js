// var express = require('express');
// var app = express();
// var i18n = require('i18n');
// var jwt = require('jsonwebtoken');

// var routerApi = express.Router();

// app.set('views', __dirname + '/views/pages/');

// app.get('/', function (req, res) {
//     res.render('index', {i18n: res});
// });

// app.get('/contact', function (req, res) {
//     res.render('contact', {i18n: res})
// });

// // routerApi.get('/authenticate', function (req, res) {

// //     let user = {
// //         login: 'admin',
// //         admin: false
// //     }

// //     if (user) {
// //         let payload = {
// //             admin: user.admin
// //         }

// //         let token = jwt.sign(payload, 'secret_token');

// //         res.json({success: true, user: user.login, token: token})
// //     }

// // });

// // routerApi.post('/login', function (req, res) {})

// // routerApi.get('/login', function (req, res) {
// //     res.render('login', {i18n: res});
// // })


// routerApi.use(function (req, res, next) {
    
//         let token;
    
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             token = req
//                 .headers
//                 .authorization
//                 .split(' ')[1];
//         } else if (req.query && req.query.token) {
//             token = req.query.token;
//         } else {
//             token = null
//         }

        
//         if (token) {

//             jwt.verify(token, 'secret_token', function (err, decoded) {
//                 if (err) {
//                     return res.json({success: false, message: 'Invalid token'})
//                 } else {
//                     req.decoded = decoded;
//                     next();
//                 }
//             })
//         } else {
    
//             return res
//                 .status(403)
//                 .send({success: false, message: 'Token not found!'})
//         }
    
//     });

// routerApi.get('/users', function (req, res) {
    
//         res
//             .status(200)
//             .send({
//                 success: true,
//                 message: {
//                     name: 'Adam'
//                 }
//             })
    
//     })
    






// app.use('/api', routerApi);

// let payload = {
//     admin: true
// }

// let token = jwt.sign(payload, 'sss');
// console.log(app.get('superSecret'));
// console.log(jwt.decode(token));

// module.exports = app;