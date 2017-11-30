const express = require('../../config/express')();
const request = require('supertest')(express);
const conn = express.infra.connectionFactory();

describe('#ProductsController', () => {

    beforeEach((done) => {
        conn.query("delete from produtos", (err,result) => {
            if(!err) {
                return done(err);
            }
        });
    });

    it('#list json', (done) => {

        request.get('/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

    });

    it('#create new product with invalid data', (done) => {

        request.post('/products')
            .send({
                titulo: '',
                descricao: 'novo livro'
            }).expect(400, done);

    });

    it('#create new product with valid data', (done) => {

        request.post('/products')
            .send({
                titulo: 'titulo',
                descricao: 'novo livro',
                preco: 20.50
            }).expect(302, done);

    });

});