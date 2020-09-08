# 学习Awesome Node Npm package



## Npm package list

+ [debug](https://github.com/visionmedia/debug.git)
+ [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#readme)
+ [connect](https://www.npmjs.com/package/connect)



## 1、connect

[Connect](https://www.npmjs.com/package/connect) 是使用中间件作为插件的可扩展的Http服务框架。

Connect  is a simple framework to glue together various 'middleware' to hadnle requests.

*使用示例：*

```javascript
const connect = require('connect')
const http = require('http')

const app = connect()

// compress outgoing response
const compression = require('compression')
app.use(compression())

const cookieSession = require('cookie-session')
app.use(cookieSession({
  keys: ['secret1', 'secret2']
}))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

app.use(function(req, res) {
  res.end('Hello from Connect!\n')
})

// create node.js http server and listen on port
http.createServer(app).listen(3000)
```





## 2、http-proxy-middleware

