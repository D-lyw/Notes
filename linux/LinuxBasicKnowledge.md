# Linux基础知识



## 一、系统相关

### 1. Linux系统根目录类别及作用

|     目录      |                描述                |
| :-----------: | :--------------------------------: |
|     arch      |         特定体系结构的源码         |
|     block     |            块设备I/O层             |
|    crypto     |              加密API               |
| Documentation |            内核源码文档            |
|    drivers    |            设备驱动程序            |
|   firmware    |  使用某些驱动程序而需要的设备固件  |
|      fs       |        vfs 和　各种文件系统        |
|    include    |             内核头文件             |
|     init      |          内核引导和初始化          |
|      ipc      |           进程间通讯代码           |
|    kernel     |     像调度程序这样的核心子系统     |
|      lib      |            通用内核函数            |
|      mm       |         内存管理子系统和VM         |
|      net      |             网络子系统             |
|    samples    |                示例                |
|    scripts    |         编译内核所用的脚本         |
|   security    |           linux安全模块            |
|     sound     |             语音子系统             |
|      usr      | 早期用户空间代码（所谓的initramfs) |
|     tools     |      在Linux开发中有用的工具       |
|     virt      |           虚拟化基础结构           |



### 2. man 命令使用

对于众多的linux系统命令，初学者可以使用man命令来查看对应命令的使用帮助手册。man 命令的使用帮助，命令行输入`man man`。

```bash
# man[选项...] [章节] 手册页
```

联机帮助手册的章节

| 章节  | 说明 |
| ----- | ----- |
| 1     | 一般用户命令 |
| 2     | 系统调用    |
| 3     | C语言函数库  |
| 4     | 有关驱动程序和系统设备的解释 |
| 5     | 配置文件的解释  |
| 6     | 游戏程序的命令 |
| 7     | 有用的杂类命令, 如宏命令包等 |
| 8     | 有关系统维护和管理的命令  |



## 二、Linux进阶高频命令

### 1. 进阶命令

#### 1.1 lsof

> lsof -- lists on its standard output file information about files opened by processes

usage:
+ lsof -h
+ man lsof

#### 1.2 objdump 

> objdump -- display information from object filesd

usage:
+ objdump -h
+ man objdump

#### 1.3 objcopy 复制二进制文件， 在这个过程中可以发生变换

> objcopy -- copy and translate object files





### 2. 高频场景

#### 2.1 查看端口使用/占用情况

(1)  `lsof`, List open files.

```bash
// 非系统自带，需安装
yum install lsof
lsof -i:<port>

// 例子，查看8080端口使用情况
lsof -i:8080
```

(2)  `ps`,   Report a snapshot of the current process.

```bash
ps aux | grep <applicatioName>

// 例子，查询当前运行Node.js进程的端口
ps aux | grep node
```

(3)  `netstat`, Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships

```bash
netstat -nlptu | grep <port>
 
-n 不进行DNS查询
-l 只显示监听状态套接字
-p 显示进程名称和进程标识符
-t 显示Tcp端口
-u 显示Udp端口

// 例子，查看所有8080端口情况
netstat -nlptu | grep 8080
```



#### 2.2 查看计算机内存使用情况



#### 2.4 强制关闭进程/杀死僵尸进程

首先单纯的使用kill命令（不加任何标识和修饰符）尝试杀死某一进程

```bash
kill <pid>
```

上述命令能解决大部分场景的问题，终止有问题的进程，并将资源释放给系统。但是，如果进程启动了子进程，只杀死父进程，子进程还在运行消耗系统资源，变成僵尸进程。需要确保在杀死父进程前，先杀死所有的子进程。



给父进程发送`TERM`信号，试图杀死它和它的子进程

```bash
kill -TERM <ppid>
```

`killall`杀死同一进程组内所有进程。需要指定要终止的进程名称，而非PID。

```bash
// 例：终止httpd进程服务
killall httpd
```

最后手段`kill -9 <PID>`，这个命令强大而危险，会迫使进程在运行中突然终止，进程在结束后不能自我清理，会导致资源无法正常释放。



参考链接

+ [https://blog.csdn.net/lechengyuyuan/article/details/16337233](https://blog.csdn.net/lechengyuyuan/article/details/16337233)





## 三、其他

### 1. 硬链接与软连接

Linux 链接分为硬链接`ln`和软链接`ln -s`

一个硬连接仅仅是一个文件名。一个文件可以有好几个文件名，只有将最后一个文件名从磁盘上删除，才能把这个文件删掉。文件名的个数是由ls(1)来确定的。所有的文件名都处于同一个状态，也就没有什么“源名字”之说。通常文件系统里的一个文件的所有名字包含着一样的数据信息，当所有与之想关的硬链接文件都被删除时，在磁盘中的该文件就真的被删除了。（++同一个文件的所有硬链接诶的索引节点号（inode index)都相同++）

一个软连接（或符号连接）是完全不同的：它是一个包含了路径信息的小小的指定文件。在软连接文件被访问，系统调用open(2)或stat(2)）的时候，操作系统用该文件所包含的路径替换该文件的访问介入点，从而实现对所指文件的访问。（***个人觉得很类似与window中的快捷方式***）。 如果一个软链接所链接的文件被删除，该链接也就达不到效果，失效了

用命令rm(1)和unlink(2)可以删除连接，但不是删除该文件所指向的文件。系统指定调用lstat(2)和readlink(2)来读取连接