var http = require('http');

http.createServer().listen(3000, () => {
    console.log('Server running at port: ' + this.address().port);
})