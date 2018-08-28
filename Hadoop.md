## Hadoops是什么？
> What is Apache Hadoop?
> The Apache Hadoop project develops open-source software for  reliable,  scalable, disttributed couputing .

+ 分布式文件系统（HDFS）
+ 并行计算框架（MapReduce）
+ 资源管理调度系统 （YARN Yet Another Resource Negotiator)


#### Hadoopt部署方式
+ 本地模式
+ 伪分布模式
+ 集群模式


##### VM 上 Hadoop 伪分布式部署

1. 常用命令
	- ifconfig   查看网络ip信息
	- hostname   查看主机名
	- service iptables status  查看防火墙信息

2. 主机名设置
   + 切换到root权限 编辑network配置文件
     ```
     # vi /etc/sysconfig/network
	   
     在文件中输入以下代码
     NETWORKING=yes
     HOSTNAME=用户名
       
     输入‘hostname 用户名', 确认修改
     # hostname 用户名
      
     ```
   + 将瞬态修改（开机重启则恢复），改成静态修改
     ```
     # vi /etc/hostname
     
     在编辑器中将默认的localhost.localdomain主机名改成要修改主机名 
     ```
     
3. 关闭防火墙
	> 查看防火墙状态&nbsp;&nbsp;&nbsp;(括号中为旧版操作命令，下同）
	  \# systemctl status iptables.service   &nbsp;&nbsp;&nbsp;(service iptables status)
    
    > 关闭防火墙
    \# systemctl stop firewalld.service &nbsp;&nbsp;&nbsp;(service iptables stop)
	
    > 关闭开机启动 (如果只是简单的关闭防火墙，则机器重启时会开启防火墙）
    \# systemctl disable firewalld.service &nbsp;&nbsp;&nbsp;(chkconfig iptables off)

3. 网络设置
	vi /etc/hosts 
    修改主机名和ip的映射关系

4. 
	