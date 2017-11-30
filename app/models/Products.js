/**
 * Class Products
 */
class Products{

    constructor(connection){
        this._connection = connection;
    }

    list(callback){
        this._connection.query('select * from produtos', callback);
    }

    show(id, callback) {
        this._connection.query('select * from produtos', callback);
    }

    create(product, callback) {
        this._connection.query('insert into produtos set ?', product, callback);
    }

    update(id, callback) {
        this._connection.query('select * from produtos', callback);
    }

    remove(id, callback) {
        this._connection.query('select * from produtos', callback);
    }
}

module.exports = () => {
    return Products;
};