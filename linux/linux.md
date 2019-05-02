# Linux 深入学习

## 基础知识





### 内核源码树的根目录描述

| 　目录　 　　　|  描述　　　　　　　　　　　　　　|
| 　---- 　　　　| -----------------　　　　　　|
| 　arch  　　　| 特定体系结构的源码　　　　　　　　|
| 　block 　　　| 块设备I/O层            　　　　|
| 　crypto　　　| 加密API               　　　　|
|  Documentation     | 内核源码文档           　|
|  drivers     | 设备驱动程序                   |
|  firmware    |  使用某些驱动程序而需要的设备固件 |
|  fs     　　　|  vfs 和　各种文件系统           |
|  include    　| 内核头文件                     |
|  init     　　|  内核引导和初始化               |
|  ipc     　　|   进程间通讯代码                 |
|  kernel     　|      像调度程序这样的核心子系统  |
|  lib     　　|         通用内核函数             |
|  mm     　　　|         内存管理子系统和VM       |
|  net   　　　　|       网络子系统              　|
|  samples     |      示例                 　　　|
|  scripts     |      编译内核所用的脚本          |
|  security     |     linux安全模块             |
|  sound   　　|  语音子系统   　　　　　　　　　　　|
|  usr  　　　　| 早期用户空间代码（所谓的initramfs)   |
|  tools   　　　| 在Linux开发中有用的工具   　　　|
|  virt   　　　　| 　虚拟化基础结构   　　　　　　　　|


### 相关链接

+ [Linux内核官方网站](https://www.kernel.org/)
+ 


https://github.com/torvalds/linux/releases?after=v2.6.12