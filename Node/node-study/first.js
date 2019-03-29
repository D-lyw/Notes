const http = require('http')

var server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end("hello, world");
})

server.listen(3000, '127.0.0.1', () => {
	console.log("server is listening at http://127.0.0.1");
})
