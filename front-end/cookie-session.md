# cookie 与 session

> cookie e好 session 都是用于 浏览器 和 服务器 之间保持会话的技术

## cookie

## session

Session 被称为会话控制, Session 对象存储特定用户会话所需的属性和配置信息. 这样当用户在应用程序的web页面间跳转是, 存储在Session对象中的变量将不会丢失, 而在整个用户会话中一直存在.

Session 的**数据是存放在服务端上**, **它的安全性要比cookie高**, 所以相对也会增加服务端的压力, 一般应用与存储一些比较隐私的数据

Session通信的一般实现方式通过cookie实现. 

当客户端访问服务端时, 会先判断客户端的请求数据中是否有SessionID, 如果没有, 则认为是该客户端第一次访问. 因为是第一次访问, 所以服务端会给客户端在对象池中创建一个Session对象, 并生成这个对象的SessionID, 接着通过Cookie将SessionID响应给客户端. 客户端接收到相应数据后,SessionID存放在本地, 下一次再访问服务端的时候会把SessionID带上, 服务端就能通过SessionID获取相应的Session对象. Session就是以这样的机制维持会话.

## 禁用 Cookie 后, 如何使用 Session

> 通常情况 使用 cookie 在服务端和客户端之间传递 SessionID, 当浏览器禁用cookie后, 如何传递

解决问题: `存储` 和 `发送` SessionID

保存: 将 SessionID 永久或半永久的保存到本地(SessionStorage/LocalStorage)
发送: 
    - 前端模板实现的全异步网站，在需要SessionID的请求时，使用：
        + xhr.setRequestHeader('X-SessionID-Header', 'B6SE3C66');
    - 非异步的网站
        + 粗暴的做法, 用js遍历所有的标签, 判断host, 如果跨域为其链接追加SessionID参数


+ 重写URL, 将 SessionID 拼接在url后面
+ 请求参数中携带 SessionID 值(get, post)
+ 表单隐藏字段
    - <form name=”"testform”" action=”"/xxx”"> <input type=”"hidden”" name=”"jsessionid”" value=”"ByOK3vjFD75aPnrF7C2HmdnV6QZcEbzWoWiBYEnLerjQ99zWpBng!-145788764″”> <input type=”"text”"> </form>
