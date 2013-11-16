var static = require('node-static'),
    http = require('http');

var webroot = process.argv[2] || '.',
    port = 8080;

var file = new(static.Server)(webroot);

http.createServer(function(req, res) {
	req.addListener('end', function() {
		file.serve(req, res);
	    }).resume();
    }).listen(port, '0.0.0.0');

console.log('node-static running at http://localhost:%d', port);
