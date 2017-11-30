/**
 * Product Route
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
                     res.render('products/list', {
                         products: products
                     });
                },
                json: () => {
                    res.json(products);
                }
            });

        });

        // close connection
        connection.end();

    };

    // List products
    app.get('/products', listProducts);

    // Create products
    app.get('/products/add', (req, res) => {

        let product = {};
        let errors = {};

        res.render('products/form', {
            errors: errors,
            product: product
        });
    });

    // Save products
    app.post('/products', (req, res) => {

        // get product params from body
        let product = req.body;

        // validate inputs
        req.assert('titulo', 'Titulo is required').notEmpty();
        req.assert('preco', 'Preco invalido').isFloat();

        // apply errors from validation
        let errors = req.validationErrors();

        // check if exist errors
        if(errors) {

            res.format({
                html: () => {
                    res.status(400).render('products/form', {
                        errors: errors,
                        product: product
                    });
                },
                json: () => {
                    res.status(400).json(errors);
                }
            });

            return;
        }

        // connect and instance products model
        let connection = app.infra.connectionFactory();
        let Products = new app.models.Products(connection);

        // save products
        Products.create(product, (err, results) => {
            res.redirect('/products')
        });

        // close connection
        connection.end();

    });

};