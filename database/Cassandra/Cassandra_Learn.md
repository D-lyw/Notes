## Cassandra_learn


> ###### 由于导师制的题目中要用到Cassandra集群来搭建项目的数据和数据签名的存储部分,计划用docker来搭建Cassandra集群.

> Cassandra 是一个来自Apache的分布式数据库,具有高度的可扩展性,可以用于管理大量的结构化数据.它提供了高可用性,没有单点故障.

##### 重点相关知识

- [Cassandra部署策略](http://www.voidcn.com/article/p-tfszppvm-we.html)
这篇文章总结了Cassandra中使用的各种策略，包括数据分局策略，数据备份策略，网络拓扑策略，数据一致性策略和存储策略等



#### 1. 集群搭建

相关网上简单教程链接
+ [Cassandra 3.x官方文档_理解解构 ](https://blog.csdn.net/qq_32523587/article/details/53574447)
+ [Cassandra集群搭建](https://blog.csdn.net/Tilyp/article/details/77141908)
+ [Cassandra集群搭建实战](https://blog.csdn.net/ch648966459/article/details/51671276)

一般的步骤是:

	确保装的机子上安装有jdk;
    在每个机子上安装Cassandra,
    然后就对其进行配置,主要对Cassandra根目录文件下的conf文件夹中的Cassandra.yaml文件进行配置,主要包括数据文件的存放路径,交易日志的存放路径,种子服务器,监听地址等;
    
    
在搭建完之后,还需要掌握它的cql语法,才能对其进行数据的操作

学习文档
+ [w3cshool Cassandra学习教程](https://www.w3cschool.cn/cassandra/)


#### 2. 通过docker方式来搭建Cassandra集群