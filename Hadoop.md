   
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


## VM 上 Linux 伪分布式集群配置

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
   
   修改完之后,执行*source /home/dlyw/.bash_profile* 命令,使修改生效;
   
   最后执行 *java -version* 命令,测试是否配置成功!
    
6. ***免密钥登陆配置***

   生成ssh免登陆密钥(首先在Maste节点进行配置)
   	$ ssh-keygen -t rsa
   出现一系列提示,简单回车即可.
   
   ssh-keygen是用来生成私钥(id_rsa文件),公钥(id_rsa.pub文件)密钥对的命令, 将本机的公钥文件拷贝到远程的主机上, 则本机就可以使用ssh登陆远程主机而不用输入密码.
   
   通过参数 '-t' 指定加密算法, RSA加密算法是一种典型的非对称加密算法
   
   生成的密钥在.ssh目录下 如 */home/dlyw/.ssh/* 下, 可通过 **ls -l** 查看
   
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
   
   首先还是用*ssh-keygen*命令生成密钥,一路回车即可
   
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

	
<br>
## Hadoop HDFS 安装与配置


> 注意: 每个结点的安装和配置是相同的,在实际工作中,通常在Master节点上完成安装和配置,然后将安装目录复制到其他的节点即可.(这里的所有操作是root权限)

<br>
1. ***下载解压安装 Hadoop***

	推荐在 archive.apache.org中下载 新手下载稳定版本使用.
    ```
    # wget https://archive.apache.org/dist/hadoop/core/stable/hadoop-2.9.1.tar.gz
    ```
    这里我们把它解压到用户目录下面
    ```
    # tar -zxvf hadoop-2.9.1.tar.gz -C ~/
    ```
    解压成功后,系统则在用户目录下面自动创建Hadoop-2.9.1子目录,此为Hadoop的安装目录

2. ***配置 Hadoop 环境变量***

	Hadoop 的环境变量文件是 hadoop-env.sh, 它在hadoop安装目录的子目录中,我们只需要修改该文件的JDK路径即可
    ```
    # vi /home/dlyw/hadoop-2.9.1/etc/hadoop/hadoop-env.sh 
    ```
    在文件的前面找到" export JAVA_HOME=${JAVA_HOME} " ,该行代码;
    
    将 ${JAVA_HOME} 用**实际的jdk路径**替换,保存,退出即可

3. ***配置 Yarn 环境变量***

	Yarn 的环境变量文件是 Yarn-env.sh, 它也在hadoop安装目录的子目录中,我们只需要修改该文件的JDK路径即可
    ```
    # vi /home/dlyw/hadoop-2.9.1/etc/hadoop/yarn-env.sh 
    ```
    在文件的前面找到" export JAVA_HOME=/home/y/libexec/jdk1.6.0/ " ,该行代码;
    
    将 /home/y/libexec/jdk1.6.0/ 用**实际的jdk路径**替换,保存,退出即可

4. *** 配置核心组件文件 ***
  
   Hadoop的核心组件文件是 core-site.xml,也位于hadoop安装目录的子目录中,编辑该文件
   ```
   # vi /home/dlyw/hadoop-2.9.1/etc/hadoop/core-site.xml
   
   需要将下面的配置代码放在文件的<configuration>和\</configuration>之间
   <property>
   		<name>fs.defaultFS</name>
           <value>hdfs://H-01:9000</value>
   </property>
   <property>
   		<name>hadoop.tmp.dir</name>
           <value>/home/dlyw/hadoopdata</value>
   </property>
    ```
    编辑完毕,保存退出
   
5. ***配置文件系统***
   
    Hadoop的文件系统配置文件是 hdfs-site.xml,也位于hadoop安装目录的子目录中,编辑该文件
   ```
   # vi /home/dlyw/hadoop-2.9.1/etc/hadoop/hdfs-site.xml
   
   需要将下面的配置代码放在文件的<configuration>和\</configuration>之间
   <property>
   		<name>dfs.replication</name>
           <value>1</value>
   </property>
    ```
    
    编辑完毕,保存退出
    
6. ***配置yarn-site.xml文件***

   Yarn的站点配置文件是 yarn-site.xml,也位于hadoop安装目录的子目录中,编辑该文件
   ```
   # vi /home/dlyw/hadoop-2.9.1/etc/hadoop/yarn-site.xml
   
   需要将下面的配置代码放在文件的<configuration>和</configuration>之间
   	
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
	</property>

	<property>
        <name>yarn.resourcemanager.address</name>
        <value>H-01:18040</value>
	</property>

	<property>
        <name>yarn.resourcemanager.scheduler.address</name>
        <value>H-01:18030</value>
	</property>
    
    <property>
        <name>yarn.resourcemanager.resource-tracker.address</name>
        <value>H-01:18025</value>
	</property>

	<property>
        <name>yarn.resourcemanager.admin.address</name>
        <value>H-01:18141</value>
	</property>

	<property>
        <name>yarn.resourcemanager.webapp.address</name>
        <value>H-01:18088</value>
	</property>
    ```
    
    编辑完毕,保存退出

7. ***配置MapReduce计算框架文件***
	在~/hadoop-2.9.1/etc/hadoop子目录下,系统已有一个mapred-site.xml.template文件,我们需要将其复制并改名,位置不变
    ```
    $ cp /home/dlyw/hadoop-2.9.1/etc/hadoop/mapred-site.xml.template /home/hadoop-2.9.1/etc/hadoop/mapred-site.xml
    ```
    然后编辑mapred-site.xml文件
    ```
    $ vi /home//hadoop-2.9.1/etc/hadoop/mapred-site.xml
    
    需要将下面的代码填充到文件的<configuration>和</configuration>中
    
    <property>
    	<name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    ```
    编辑完成,保存退出.
    
8. ***配置Master的slaves文件***
> slaves 文件给出Hadoop集群的slavae节点列表.该文件十分重要,启动时系统总是根据当前slaves文件中的slave节点列表启动集群,不在列表中的slave节点便不会视为计算节点
	
    编辑 slaves 文件
    
    ```
	$ vi /home/dlyw/hadoop-2.9.1/etc/hadoop/slaves
    
    删除文件中原来有的缺省的localhost,然后添加计划投入使用的集群主机,如输入以下代码
  
    P-01
    P-02
    P-03
    
    ```
    编辑完成,保存退出.

9. ***复制 Master 上的 Hadoop 到 Slave 节点***

   通过负责 Master 节点上的 Hadoop,能大大提高系统部署效率,使用如下命令
   ```
   $ scp -r /home/dlyw/hadoop-2.9.1 dlyw@P-01:~/
   $ scp -r /home/dlyw/hadoop-2.9.1 dlyw@P-02:~/
   $ scp -r /home/dlyw/hadoop-2.9.1 dlyw@P-03:~/
   ```
   注意: 由于我们前面已经配置了免密钥登陆,因此这里不会有密码输入认证,回车后就开始复制
   
   这样,我们就完成了 Hadoop 集群的安装和配置!


## Hadoop 集群的启动

> 在首次启动hadoop之前,还需要做一些配置

1. ***配置操作系统环境变量***

	由于我们是在Linux集群上安装的 Hadoop 集群,自然需要配置 Linux 系统平台的环境变量.(需要在集群的所有计算机上进行,以普通用户身份)
    
    进入用户目录,编辑 .bash_profile 文件
    
    ```
    $ vi ~/.bash_profile
    
    将下述代码追加到文件的尾部
    
    # hadoop
    export HADOOP_HOME=/home/dlyw/hadoop-2.9.1
    export PATH=$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH
    ```
    保存退出,执行 ' source ~/.bash_profile' 命令,使上述配置生效
    
    其他节点,也需进行上述配置.

2. ***创建Hadoop数据目录***
	
    可在用户主目录下,创建数据目录
    ```
    $ mkdir /home/dlyw/hadoopdata
    ```
    这里的数据目录名 'hadoopdata' 需要和前面 Hadoop 核心组件文件 core-site.xml中的配置中的数据目录名保持一致.
    
    其他所有节点也需进行上述配置

3. ***格式化文件系统***

	该操作只需要 Master 节点上进行,命令如下
    ```
    $ hdfs namenode -format
    ```

4. ***启动和关闭 Hadoop***

	进入 Hadoop 安装主目录, 然后执行 sbin/start-all.sh 命令
    
    按照提示输入,即可启动Hadoop.
    
    关闭

4. ***启动和关闭 Hadoop***

	进入 Hadoop 安装主目录, 然后执行 sbin/start-all.sh 命令
    
    按照提示输入,即可启动Hadoop.
    
    要关闭 Hadoop 集群, 可以使用 stop-all.sh 命令
    
    下次启动 Hadoop 时, 无需 Nameode的初始化, 只需要 使用 start-dfs.sh,然后使用 start-yarn.sh 启动 yarn 即可.

5. ***验证 Hadoop 是否启动成功***
   
   用户在 终端 执行 jps 命令查看Hadoop是否启动成功
   
   在Master节点, 如果显示 SecondaryNameNode, ResourceManager, Jps 和 NameNode ,则说明启动成功
   
   在Slave节点, 如果显示 NodeManager, Jps 和 DateNode 三个进程,则说明从节点启动成功.
   
   也可使用Web界面查看系统状况,在 Master 节点的浏览器中输入 http://H-01:9000 ,查看.
   
   或输入 http://H-01:18088 查看yarn的运行状况
   
   (主机名和端口号都以配置时的数值为准)