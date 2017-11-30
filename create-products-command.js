const http = require('http');

const config = {
    hostname: 'localhost',
    port: 3000,
    path: '/products',
    method: 'post',
    headers: {
        'Accept':'application/json',
        'Content-type':'application/json',
    }
};

const client = http.request(config, (res) => {
    console.info(res.statusCode);
    res.on('data', (body) => {
        console.log(body.toString('utf8'));
    });
});

const product = {
    titulo: '',
    descricao: 'node, javascript e um pouco sobre http',
    preco: 100
};

client.end(JSON.stringify(product));