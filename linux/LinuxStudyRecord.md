# Linux学习记录



### 近期阅读书籍

+ **Linux内核设计与实现**
    - 个人觉得结构内容适中， 对刚入门的小白比较友好， 
    - 可以认真学习此书， 然后粗看 深入理解linux内核 一书 
+ **Unix编程艺术**
    - 浏览了一遍， 主要了解了 unix 的发展历程和 linux 的关系
    - 简单看了， 其中unix的设计思想和理念
+ **Unix高级环境编程**
    - 一本面向接口编程的书
+ **linux+shell 脚本攻略**
    - 每章主要讲了linux中某些常用命令的高级使用
+ **linux环境编程： 从应用到内核开发**
    - 该书内容介于 linux内核设计与事项 和 apue 之间， 对于过渡到内核学习有一定帮助
    - 比如在讲socket时， 介绍到connect函数时， 会对其源码进行讲解
+ **linux网络体系结构 - linux内核中网络协议的设计与实现**
    - 




















### 相关链接

+ [Linux内核官方网站](https://www.kernel.org/)
+ [github上保存的最早的linux版本(v.2.6.12)](https://github.com/torvalds/linux/releases?after=v2.6.12


### linux源码追踪 -- TCP三次握手

服务端 accept函数阻塞客户端的连接,
客户端使用 connect 方法连接到服务器, 
三次握手的过程就发生在这个过程中.

从 socket 套接字的 connect 方法开始追踪




