module.exports = {
    configure: function (app, i18n, config) {
        app.locals.i18n = config;
        i18n.configure(config);

    },
    init: function (req, res, next) {
        var rxLocale = /^\/(\w\w)/i;

        console.log('Middleware init', rxLocale.test(req.url));

        if (rxLocale.test(req.url)) {
            var locale = rxLocale.exec(req.url)[1];
            
            if (req.app.locals.i18n.locales.indexOf(locale) >= 0) {
                
                req.setLocale(locale);
                res.cookie('i18n', locale);

            } else if(req.cookies.i18n !== undefined) {

                // not match lang from url but let's check 
                // if it's in cookies
                req.setLocale(req.cookies.i18n);

            }
        }

        next();
    },
    url: function (app, url) {
        var locales = app.locals.i18n.locales;
        var urls = [];
        for (var i = 0; i < locales.length; i++) 
            urls[i] = '/' + locales[i] + url;
        urls[i] = url;
        console.log('Urls: ', urls);
        
        return urls;
    }
};