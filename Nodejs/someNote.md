#### 事件轮询

jQuery用XMLHttpRequest（XHR） 做Ajax请求

```javascript
$.post('/resource.json', function (data) {
    console.log(data);
})
```

```javascript
var data = $.post('/resource.json');
console.log(data);
```





DIRT(data-intensive real-time) 数据密集型实时程序



简单的异步程序

```javascript
const fs = require('fs');
fs.readFile('./resource.json', function(err, data) {
	console.log(data);
})
```



简单的Http服务器

```javascript
const http = require('http');

var server = http.createServer();
server.on('request', function(req, res) {
	res.writeHead('200', {"Content-Type": "text/plain"});
	res.end("Hesllo world");
})
```



流数据

```javascript
var stream = fs.createReadStream('./resource.json');
stream.on('data', function (chunk) {
	console.log(chunk);
})
stream.on('end', function () {
    console.log("finished");
})
```



eg:

```
const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'image/png'});
	fs.createReadStream('./image.png').pipe(res);
}).listen(3000);
console.log('Server running at http://localhost:3000');
```



异步编程技术

+ **回调**   一次性的响应
+ **事件监听** 响应重复性的事件



  



















