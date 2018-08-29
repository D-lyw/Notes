## Hadoops是什么？
> What is Apache Hadoop?
> The Apache Hadoop project develops open-source software for  reliable,  scalable, disttributed couputing .

+ 分布式文件系统（HDFS）
+ 并行计算框架（MapReduce）
+ 资源管理调度系统 （YARN Yet Another Resource Negotiator)


######  Hadoop部署方式
+ 本地模式
+ 伪分布模式
+ 集群模式


## VM 上 Hadoop 伪分布式集群配置

1. ***常用命令***
	- ifconfig   查看网络ip信息
	- hostname   查看主机名
	- service iptables status  查看防火墙信息

2. ***主机名修改***

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
     
3. ***关闭防火墙***

    +  查看防火墙状态&nbsp;&nbsp;&nbsp;(括号中为旧版操作命令，下同）
        ```
        # systemctl status iptables.service   &nbsp;&nbsp;&nbsp;(service iptables status)
        ```
	
    +  关闭防火墙
       ```
       # systemctl stop firewalld.service &nbsp;&nbsp;&nbsp;(service iptables stop)
       ```
       
    +  关闭开机启动 (如果只是简单的关闭防火墙，则机器重启时会开启防火墙）
        ```
       # systemctl disable firewalld.service &nbsp;&nbsp;&nbsp;(chkconfig iptables off)
        ```
	
4. ***网络设置***
	
    + 网络地址修改
    
      VM上的linux主机采用bridge,NET,或者Host-only都行,只要保证集群里面的所有虚拟机在同一网段内,并且相互任意之间均可ping通,
      
      修改方式可通过命令行进行修改,也可通过图形化界面进行修改.若担心下次网络重新连接时,原有的ip地址被改变,可设置静态ip地址
    
    + 修改主机名和ip的映射关系, 主要是为了方便通过主机名进行网路访问
	    ```
	    # vi /etc/hosts 

	    输入以下代码(注意,保留原有代码,在后面添加新代码), 如
	    192.168.169.129 P-01
	    192.168.169.130 P-02
	    192.168.169.131 P-03
	    192.168.169.128 H-01
	    ```
	注意:上述操作,需要在集群的所有主机上进行.
    
    在任意主机终端,通过 *ping <主机名>* 测试连通性
    
5. ***安装JDK***

   Hadoop平台是基于Java环境的,因此我们必须在linxu主机上安装JDK
   由于在新建linux虚拟机的时候,已经安装了jdk环境,所以这次安装JDK步骤就省去了
   
   步骤就两步:
   
   一: 在合适的地方解压缩JDK安装压缩包;
   
   二: 配置java环境变量
   
   ```
   # vi /home/dlyw/.bash_profile
   
   在已有的代码尾部,加上如下代码(原有代码,不能改动)
   
   # 以下是新加的代码
   export JAVA_HOME=JDK 的安装路径
   export PATH=$JAVA_HOME/bin:$PATH
   
   ```
   假设JDK的安装路径为/usr/java/jdk1.9.0_31/   , 则"JDK的安装路径"几个字就用 /usr/java/jdk1.9.0_31/代替
   
   修改完之后,执行*** source /home/dlyw/.bash_profile *** 命令,使修改生效;
   
   最后执行 *** java -version*** 命令,测试是否配置成功!
    
6. ***免密钥登陆配置***

   生成ssh免登陆密钥(首先在Maste节点进行配置)
   	$ ssh-keygen -t rsa
   出现一系列提示,简单回车即可.
   
   ssh-keygen是用来生成私钥(id_rsa文件),公钥(id_rsa.pub文件)密钥对的命令, 将本机的公钥文件拷贝到远程的主机上, 则本机就可以使用ssh登陆远程主机而不用输入密码.
   
   通过参数* -t * 指定加密算法, RSA加密算法是一种典型的非对称加密算法
   
   生成的密钥在.ssh目录下 如 * /home/dlyw/.ssh/ * 下, 可通过 **ls -l** 查看
   
   接下来将公钥文件复制到.ssh目录下
   ```
   $ cp ~/.ssh/id_rsa.pub ~/.ssh/authorized.keys
    ```
   然后将authorized.keys文件复制到所有的Slave节点上, 本次搭建的有三个从属节点,需要执行三次命令
   
   ```
   $ scp ~/.ssh/authorized_keys dlyw@P-01:~/
   $ scp ~/.ssh/authorized_keys dlyw@P-02:~/
   $ scp ~/.ssh/authorized_keys dlyw@P-03:~/         //P-01, P-02, P-03是三个从属节点的主机名, dlyw是用户名
   ```
   这样就完成了Master结点的配置,然后进行Slave结点的配置
   
   首先还是用* ssh-keygen *命令生成密钥,一路回车即可
   
   接着将authorized_keys(该文件是从 Master主机上拷贝过来的)文件,移动到.ssh目录下
   ``` 
   $ mv authorized_keys ~/.ssh
   ```
   然后将此Slave配置在其他的从属节点上也操作一遍
   
   验证是否配置成功,
   ```
   $ ssh P-02
   ```
   执行上述命令,用ssh命令连接任意一台从属节点,若登陆成功,且无需输入密码,则配置成功!  
   (使用exit命令,从远程节点退回到本地计算机)

	
