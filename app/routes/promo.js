/**
 * Promo Route
 * @param app
 */
module.exports = (app) => {

    // List products function
    const listProducts = (req, res, next) => {

        // connect and instance products model
        let connection = app.infra.connectionFactory();
        let Products = new app.models.Products(connection);

        // list products
        Products.list((err, results) => {

            // check error
            if(err){
                return next(err);
            }

            let products = results && results.length > 0
                ? results
                : [];

            res.format({
                html: () => {
                    res.render('promo/form', {
                        products: products
                    });
                }
            });

        });

        // close connection
        connection.end();

    };

    // Create products
    app.get('/promo/add', listProducts);

    // Save products
    app.post('/promo', (req, res) => {

        // get product params from body
        let promo = req.body;

        // send socketIO action
        app.get('io').emit('newPromo', promo);

        res.redirect('/promo/add');

    });


};