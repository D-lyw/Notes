# SSH

## SSH协议、使用终端介绍

> SSH — OpenSSH SSH 客户端 (远程登录程序)

ssh (SSH 客户端) 用于登录远程主机, 并且在远程主机上执行命令.  它的目的是替换 rlogin 和 rsh, 同时在不安全的网络之上, 两个互不 信任的主机之间, 提供加密的, 安全的通信连接.  X11 连接和任意 TCP/IP 端口均可以通过此安全通道转发(forward).









### man手册介绍

+ `man ssh`
+ `man sshd`
+ `man ssh_config`



## 常见问题：

> ### 1. SSH连接一段时间后， 自动断开， 无响应

#### 原因在于防火墙

1. 服务器存在防火墙，会关闭超时空闲连接，或设置了关闭超时空闲连接。
2. 客服端和服务器之间存在路由器，路由器也可能带有防火墙，会关闭超时空闲连接。
3. 客服端存在防火墙，会关闭超时空闲连接。

NAT防火墙喜欢对空闲的会话进行超时处理，以确保它们状态表的干净和内存的低占用率。

#### 解决方案

- 修改服务端配置

  - 命令行配置　>  用户级配置文件($HOME/.ssh/config)  >  系统级配置文件(/etc/ssh/sshd_config  /etc/ssh/ssh_config)

  ```bash
  TCPKeepAlive yes #表示TCP保持连接不断开
  ClientAliveInterval 300 #指定服务端向客户端请求消息的时间间隔，单位是秒(服务端主动发起，等待客户端响应，成功则保持连接)
  ClientAliveCountMax 3 #指服务端发出请求后客户端无响应则自动断开的最大次数
  ```

  + 重启sshd服务 `systemctl restart sshd`

- 修改客户端配置

  - 与服务端配置类似

- 修改连接工具的配置

  通过改变连接工具的一些默认配置，把keepalive的配置打开起来即可：

  secureCRT：会话选项 - 终端 - 反空闲 - 发送NO-OP每xxx秒，设置一个非0值。

  putty：Connection - Seconds between keepalive(0 to turn off)，设置一个非0值。

  iTerm2：profiles - sessions - When idle - send ASCII code.

  XShell：session properties - connection - Keep Alive - Send keep alive message while this session connected.

- 设置连接参数

  `ssh -o ServerAliveInterval=30 user@host`









### 免密码登录服务器配置

>  以本地系统免密登录远端服务器为例

在本地使用`ssh-keygen` 命令，生成公钥和私钥文件， 将生成的公钥文件传到服务器的～:/.ssh/authorized_keys文件中

```bash
ssh-keygen -t rsa
# 生成公钥和私钥的默认位置在
# ~/.ssh/id_rsa		~/.ssh/id_rsa.pub

# 将id_rsa.pub文件复制到服务器的authorized_keys
scp ~/.ssh/id_rsa.pub user@<server_ip>~/.ssh/autorized_keys
```

