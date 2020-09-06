# Nginx的日常配置和使用



## 1、Nginx基本命令

+ nginx
  + 启动
+ nginx -s stop/quit/restart/reload
  + send a single to master process: stop, quit, restart, reload
+ nginx -t 
  + Test configuration and exit.
+ nginx -h
  + More help message

可以使用`nginx -V`、或者`nginx -t`命令来查看nginx的配置文件目录信息。



## 2、Nginx配置文件相关设置



### 2.1、开启gzip压缩

我们通过使用nginx的gzip模块来开启gzip压缩，示例代码如下：

```bash
server {
		gzip 	on;
		gzip_types	text/plain application/xml;
		gzip_proxied no-cache no-store private expired auth;
		gzip_min_length 1000;
		...
}
```



### 2.2、缓存



### 2.3、负载均衡

```bash
http {
		upstream fooapp {
				server localhost:3000;
				server domain2;
				server domain3;
		}
}

server {
		listen 80;
		location / {
				proxy_pass http://fooapp;
		}
}
```



### 2.4、反向代理

正向代理是隐藏网络请求的发起发，反向代理是隐藏网络请求资源服务的提供方。

```bash
server {
		listen 80;
		location / {
				proxy_pass http://localhost:3000;
		}
}
```









## 3、Nginx相关使用