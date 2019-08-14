# wget

`GNU Wget`（常简称为Wget）是一个在网络上进行下载的简单而强大的自由软件，其本身也是GNU计划的一部分。它的名字是“World Wide Web”和“Get”的结合

当前它支持通过HTTP、HTTPS，以及FTP这三个最常见的TCP/IP协议协议下载

### 它的主要特点包括：

支持递归下载
恰当的转换页面中的链接
生成可在本地浏览的页面镜像
支持代理服务器

详细命令 `man wget`

### 缺点：

+ 支持的协议较少，特别是cURL相比。流行的流媒体协议mms和rtsp没有得到支持，还有广泛使用各种的P2P协议也没有涉及。
+ 支持协议过老。当前HTTP还是使用1.0版本，而HTML中通过JavaScript和CSS引用的文件不能下载。
+ 灵活性不强，扩展性不高。面对复杂的镜像站会出现问题。
+ 命令过于复杂，可选的设置项有上百个





# cURL

curl(CommandLine Uniform Resource Locator)

cURL是一个利用URL语法在命令行下工作的文件传输工具，1997年首次发行。它支持文件上传和下载，所以是综合传输工具，但按传统，习惯称cURL为下载工具。cURL还包含了用于程序开发的libcurl。



### 支持众多的协议

cURL支持的通信协议有FTP、FTPS、HTTP、HTTPS、TFTP、SFTP、Gopher、SCP、Telnet、DICT、FILE、LDAP、LDAPS、IMAP、POP3、SMTP和RTSP。

curl还支持SSL认证、HTTP POST、HTTP PUT、FTP上传, HTTP form based upload、proxies、HTTP/2、cookies、用户名+密码认证(Basic, Plain, Digest, CRAM-MD5, NTLM, Negotiate and Kerberos)、file transfer resume、proxy tunneling。 