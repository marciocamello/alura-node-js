const http = require('http');

const config = {
    hostname: 'localhost',
    port: 3000,
    path: '/products/json',
    headers: {
        'Accept':'application/json'
    }
};

http.get(config, (res) => {
    console.info(res.statusCode);
    res.on('data', (body) => {
        console.info('corp' + body);
    });
});