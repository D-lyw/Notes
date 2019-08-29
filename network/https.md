# Https

## 什么是HTTPS？

HTTPS = HTTP + SSL/TSL，是HTTP协议的安全版。

Http协议使用明文传输， 不安全

Https的作用：

+ 对传输数据进行加密，并建立一个安全的信息通道，保证传输过程的数据安全
+ 对网站服务器进行真实性的身份认证

## SSL/TSL又是什么？

SSL的全称是Secure Sockets Layer，即安全套接层协议，是为网络通信提供安全及数据完整性的一种安全协议。SSL最新的版本是3.0。

TLS的全称是Transport Layer Security，即安全传输层协议，是建立在SSL 3.0协议规范之上，是SSL 3.0的后续版本。

SSL/TSL = 非对称加密（如RSA、ECC） + 对称加密（如AES、DES） + 散列算法（如MD5）



## 图解流程

![https协议流程](https://p5.ssl.qhimg.com/t01dcb1e0a58638cf3b.jpg)



### 证书

> A public key or digital certificate (formerly called an SSL certificate) uses a public key and a private key to enable secure communication between a client program (web browser, email client, etc.) and a server over an encrypted SSL (secure socket layer) or TLS (transport layer security) connection. The certificate is used both to encrypt the initial stage of communication (secure key exchange) and to identify the server. The certificate includes information about the key, information about the server identity, and the digital signature of the certificate issuer. If the issuer is trusted by the software that initiates the communication, and the signature is valid, then the key can be used to communicate securely with the server identified by the certificate. Using a certificate is a good way to prevent “man-in-the-middle” attacks, in which someone in between you and the server you think you are talking to is able to insert their own (harmful) content.



### 获取服务器的证书

```bash
# 服务器证书是返回的第一个证书，将采用PEM格式。 CA证书是返回的最终证书，也是PEM格式。
openssl s_client -showcerts -connect www.example.com:443 </dev/null

# 如如果远程服务器正在使用SNI(即，在单个IP地址上共享多个SSL主机)，则还需要发送正确的主机名，以获取正确的证书果远程服务器正在使用SNI(即，在单个IP地址上共享多个SSL主机)，则还需要发送正确的主机名，以获取正确的证书
openssl s_client -showcerts -servername www.example.com -connect www.example.com:443 </dev/null
```



### 查看https协议的具体过程

```bash
curl -v https://www.google.com
*   Trying 2404:6800:4008:802::2004:443...
* TCP_NODELAY set
*   Trying 69.171.245.53:443...
* TCP_NODELAY set
* Connected to www.google.com (2404:6800:4008:802::2004) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/ssl/certs/ca-certificates.crt
  CApath: none
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* ALPN, server accepted to use h2
* Server certificate:
*  subject: C=US; ST=California; L=Mountain View; O=Google LLC; CN=www.google.com
*  start date: Jul 29 18:43:22 2019 GMT
*  expire date: Oct 21 18:23:00 2019 GMT
*  subjectAltName: host "www.google.com" matched cert's "www.google.com"
*  issuer: C=US; O=Google Trust Services; CN=Google Internet Authority G3
*  SSL certificate verify ok.
* Using HTTP2, server supports multi-use
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* Using Stream ID: 1 (easy handle 0x556a0f89ff30)
> GET / HTTP/2
> Host: www.google.com
> User-Agent: curl/7.65.3
> Accept: */*
> 
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
* Connection state changed (MAX_CONCURRENT_STREAMS == 100)!
< HTTP/2 302 
< location: https://www.google.com.hk/url?sa=p&hl=zh-CN&pref=hkredirect&pval=yes&q=https://www.google.com.hk/&ust=1565792263142390&usg=AOvVaw1mM-S9fDNWH7vjak4zXQN1
< cache-control: private
< content-type: text/html; charset=UTF-8
< p3p: CP="This is not a P3P policy! See g.co/p3phelp for more info."
< date: Wed, 14 Aug 2019 14:17:13 GMT
< server: gws
< content-length: 372
< x-xss-protection: 0
< x-frame-options: SAMEORIGIN
< set-cookie: 1P_JAR=2019-08-14-14; expires=Fri, 13-Sep-2019 14:17:13 GMT; path=/; domain=.google.com
< set-cookie: NID=188=QZTFOwv-yVDx_DWE01Wq4o1t8At5Ke5Pcw9-AE9TdzW8Et2x8d2gG_UAXEHaH5sNWR8Y5Ki8_E5f0jIwqq3wJf5gCHGOxbBQafXhD0cRD7ewxX0VdTdUeDyI87WnFcz--YwOn1Ex7G8yeAeNMl2M7dOiYlVgSqh63iOjr4DdznU; expires=Thu, 13-Feb-2020 14:17:13 GMT; path=/; domain=.google.com; HttpOnly
< alt-svc: quic=":443"; ma=2592000; v="46,43,39"
......

```















相关链接

+ [OpenSSL 介绍和使用](https://www.jianshu.com/p/fb2ae3dc7986)
+ [OpenSSL官网](https://www.openssl.org/docs/OpenSSLStrategicArchitecture.html)

openssl 功能：

1. 加密文件 
   + 支持7种对称加密方式(AES、DES、Blowfish、CAST、IDEA、RC2、RC5)
   + 上述都支持(ECB、CBC、CFB、OFB)
   + 支持4种非对城加密方式(DH算法、RSA算法、DSA算法、椭圆曲线算法(EC))
2. 获取摘要 `openssl dgst`
3. 生成密码
4. 生成随机数
5. 生成秘钥对
6. 创建证书

