# 浏览器中Http协议相关



## Http访问控制（CORS）

+ [MDN 链接](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#Preflighted_requests)

  

**跨域资源共享**（CORS）是浏览器的一种机制，它使用额外的**HTTP**头部来告诉浏览器，允许让运行在一个origin（damain）上的Web应用访问不同源服务器上的指定资源。

当一个资源从与该资源本身所在服务器**不同的域、协议或端口**请求一个资源时，资源会发起一个**跨域HTTP请求**

网络上的页面很多都会加载不同域的CSS，图片和脚本等。

处于安全考虑，浏览器限制从脚本内发起的跨域HTTP请求，需遵循同源侧率，除非响应保温包含了正确的CORS响应头。



### 简单请求

某些跨域请求不会触发**CORS预检请求**，这样的请求为**简单请求**，需满足下述条件：

- 使用下列方法之一：

  - [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)
  - [`HEAD`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD)
  - [`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST)

- 除了被用户代理自动设置的首部字段（例如 `Connection`，`User-Agent`）和在 Fetch 规范中定义为 

  禁用首部名称的其他首部，允许人为设置的字段为 Fetch 规范定义的 

  对 CORS 安全的首部字段集合

  。该集合为：

  - [`Accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)
  - [`Accept-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)
  - [`Content-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language)
  - [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) （需要注意额外的限制）
  - `DPR`
  - `Downlink`
  - `Save-Data`
  - `Viewport-Width`
  - `Width`

- `Content-Type`的值仅限于下列三者之一：

  - `text/plain`
  - `multipart/form-data`
  - `application/x-www-form-urlencoded`

- 请求中的任意[`XMLHttpRequestUpload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload) 对象均没有注册任何事件监听器；[`XMLHttpRequestUpload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload) 对象可以使用 [`XMLHttpRequest.upload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload) 属性访问。

- 请求中没有使用 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 对象。

### 预检请求

需预检的请求要求必须首先使用`OPTIONS`方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。“预检请求”的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。

