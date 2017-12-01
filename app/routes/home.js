/**
 * Home Route
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
                    res.render('home/index', {
                        products: products
                    });
                }
            });

        });

        // close connection
        connection.end();

    };

    // Create products
    app.get('/', listProducts);

};