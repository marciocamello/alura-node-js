const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

/**
 * Export express config
 * @returns {*|Function|app|Express}
 */
module.exports = () => {

    const app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    load('routes', { cwd: 'app' })
        .then('models')
        .then('infra')
        .into(app);

    console.info('Express loaded.');

    return app;

};