const app = require('./config/express')();

app.listen(3000,() => {
    console.log('Server are listening in port 3000')
});