const http = require('http')
    , app = require('./config/express');

http.createServer(app).listen(3000, () => {
    console.log('Server running in port: ' + this.address().port);
});