# 记录平时看过的比较好的文章博客或网站

## 类别

### 1. 如何优雅处理前端的异常？

#### 主要内容:

+ 可疑区域增加 Try-Catch
+ 全局监控 JS 异常 window.onerror
+ 全局监控静态资源异常 window.addEventListener
+ 捕获没有 Catch 的 Promise 异常：unhandledrejection
+ VUE errorHandler 和 React componentDidCatch
+ 监控网页崩溃：window 对象的 load 和 beforeunload
+ 跨域 crossOrigin 解决

##### [文章链接](https://segmentfault.com/a/1190000018754274)


## 浏览器/网络

### + Berners-Lee 对年轻人的回答的若干问题

#### 主要内容: 

#### [文章链接](https://www.w3.org/People/Berners-Lee/Kids.html)

### + 使用Tor 保护自己时千万不要做这九件事

#### [文章链接](https://steemit.com/crypto/@iyouport/tor)





## 计算机相关

+ ### 阮一峰 字符编码介绍 ASCII, UNICODE, UTF-8

  + [文章链接](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)







X.509 证书信息：
	版本：3
	序列号（16进制）： 75f7f33c3eacdbc88677c60a1a373506
	发行者：CN=WoSign OV SSL CA,O=WoSign CA Limited,C=CN
	有效性：
		不早于： 四 3月 16 11:13:41 UTC 2017
		不晚于： 六 3月 14 11:13:41 UTC 2020
	主题：CN=*.qihoo.net,ST=北京市,L=北京市,O=北京奇虎科技有限公司,C=CN
	主题 公钥算法：RSA
	算法安全级别：Medium（2048 位）
		模块(位 2048)：
			00:a7:64:0d:e0:92:74:cd:cf:0d:83:ca:24:dd:4e:f2
			08:d0:be:a2:3a:4a:22:5e:c8:0b:98:9f:04:a6:ae:b8
			97:33:57:fb:b5:86:e6:ac:d2:e1:b0:ac:20:b2:44:59
			4c:ea:12:6d:7c:0b:e0:28:50:d4:a4:71:6b:00:2d:8c
			6c:a2:d4:fe:1e:59:19:f0:1f:c1:a9:5c:b9:14:4e:ab
			26:dd:ee:9b:d7:37:51:69:10:bb:c9:28:db:73:37:cd
			55:db:65:0d:46:4b:c4:a0:02:5a:c4:e6:8d:62:5c:27
			a3:98:cf:61:99:94:6f:75:24:29:85:72:a2:7d:83:7e
			38:0d:59:ef:a7:f8:6e:90:66:6c:06:6a:92:d4:f1:5b
			38:8f:8e:6c:7f:4d:fd:c0:20:a1:b4:dc:27:e5:50:64
			75:43:2e:17:a0:23:a6:b1:12:20:e5:c3:85:c4:31:a8
			ca:cf:b7:3c:d6:a4:00:ca:d5:60:13:48:b5:86:2d:9a
			1c:87:25:ca:0e:3e:56:3e:f4:10:f2:e0:a1:91:10:c0
			12:60:7c:ca:1b:b6:ff:3d:6c:34:48:bb:f4:a4:7d:af
			b1:67:6c:e3:76:55:c3:67:f2:24:df:22:8a:3f:94:ff
			c4:b2:a8:39:c9:77:a9:90:cb:6a:b2:61:20:b7:0e:4b
			b9
		指数（位 24）：
			01:00:01
	扩展：
		基本限制（关键）：
			证书颁发机构（CA）：FALSE
		CRL 分发点（非关键）：
			URI: http://wosign.crl.certum.pl/wosign-ovca.crl
		作者信息入口（非关键）：
			Access Method: 1.3.6.1.5.5.7.48.1 (id-ad-ocsp)
			Access Location URI: http://wosign-ovca.ocsp-certum.com
			Access Method: 1.3.6.1.5.5.7.48.2 (id-ad-caIssuers)
			Access Location URI: http://repository.certum.pl/wosign-ovca.cer
		作者密钥标识符（非关键）：
			a11354dc56732c2782cac884efeebf00fd5fab56
		主题密钥标识符（非关键）：
			7cc1b354d7efbf0b206dba6f557f75cbb3dfcdf4
		密钥用法（关键）：
			数字签名。
			密钥加密。
		Certificate Policies (非关键):
			2.23.140.1.2.2
			1.2.616.1.113527.2.5.1.12.2
				Note: Usage of this certificate is strictly subjected to the CERTUM Certification Practice Statement (CPS) incorporated by reference herein and in the repository at https://www.certum.pl/repository.
		密钥目的（非关键）：
			TLS WWW 服务器。
			TLS WWW 客户端。
		主题备用名（非关键）：
			DNSname: *.qihoo.net
			DNSname: qihoo.net
	签名算法：RSA-SHA256
	签名：
		10:7e:d6:f0:0c:30:09:87:2b:5d:27:8c:d1:d3:45:43
		c6:f2:e1:3a:80:ad:7c:ac:45:b5:38:7d:3c:28:0d:f2
		db:3a:52:ee:3f:37:28:88:d1:e0:ed:ec:e7:2f:88:41
		4a:fb:e2:e2:9f:e0:4c:48:dd:b1:12:43:e1:f0:a4:4c
		f6:5c:04:25:25:5a:7f:45:e4:37:b8:7c:7f:9c:fb:85
		63:ad:0c:bb:cf:42:4a:ca:4b:26:70:3a:52:58:5c:b0
		77:45:77:68:e0:3f:8a:84:f5:6e:2e:20:e6:25:9e:21
		a8:7c:35:53:5e:dc:07:e4:bd:f1:ab:67:c4:a7:3c:e5
		3b:e8:05:48:77:8c:8b:96:dc:da:eb:53:0d:ae:ea:4d
		50:d0:09:2d:c4:2a:20:68:d0:af:40:8d:9f:d3:f7:62
		9a:31:64:2f:d3:94:ef:1f:46:d7:49:5a:e9:f6:ae:fd
		6a:a0:a5:fe:c6:3a:69:95:a6:72:5b:96:7c:22:3a:5a
		d9:df:0b:38:2b:09:d3:87:62:76:9e:1d:93:c5:ac:a1
		ff:f5:94:bc:2a:f6:9d:f6:0f:b2:4f:27:b9:95:b6:cb
		07:14:de:3b:09:14:f4:5a:bd:42:01:c6:bf:a4:e7:6f
		81:fe:81:5b:30:13:46:a3:d4:f5:4c:99:82:e3:e0:16
其它信息：
	Fingerprint:
		sha1:928b86fd0d38b203eae2145059709f43e5905cc2
		sha256:51ed76e4a095b8ba411fd0c42bdeaca0139e118bdb6e7975458099117648965b
	Public Key ID:
		sha1:3fe4f93dd29ad0eb265c10883242a703744a11b9
		sha256:40fd45ddbff2a1ff7c28b31e8a9b01cc2ffc3d4f8069b94f52c3fdd89c2706ab
	Public Key PIN:
		pin-sha256:QP1F3b/yof98KLMeipsBzC/8PU+AablPUsP92JwnBqs=
Server key hash: pin-sha256:QP1F3b/yof98KLMeipsBzC/8PU+AablPUsP92JwnBqs=

Certificate from VPN server "vpn.qihoo.net" failed verification.