---
title: 52-X
description: '52-X'
categories:
 - "学习"
tags: 
 - "linux_韩老师"
date: 2022-06-26 14:16:17
updated: 2022-06-26 14:16:17
---

## crond快速入门

- 使用命令
  crontab -e 创建一个定时任务

  ```shell
  */1 * * * * ls -l /etc/ > /tmp/to.txt
  ```

- 特殊符号
  ，代表不连续
  -破折号 表示连续
  ![ly-20241212142139460](img/ly-20241212142139460.png)

- 其他
  ![ly-20241212142139656](img/ly-20241212142139656.png)

- 定时调用脚本

  - 编辑脚本
    my.sh

    ```shell
    date >> /home/mycal
    date >> /home/mycal
    ```

  - 给脚本赋予x权限

    ```shell
    chmod u+x my.sh
    ```

  - crontab -e

    ```shell
    */1 * * * * my.sh
    ```

  - 数据库备份
    ![ly-20241212142139724](img/ly-20241212142139724.png)

  - crontab -r 删除

  - crontab -l 列出

  - crontab -e 编辑任务

- atd 是否在运行
  yum install -y atd 
  systemctl start atd

- job队列
  ![ly-20241212142139792](img/ly-20241212142139792.png)

- at选项
  ![ly-20241212142139857](img/ly-20241212142139857.png)

- at指定时间
  ![ly-20241212142139923](img/ly-20241212142139923.png)

- 添加任务
  ![ly-20241212142139992](img/ly-20241212142139992.png)
  ![ly-20241212142140058](img/ly-20241212142140058.png)

- at 5pm tomorrow 明天下午5点

- at now + 2 minutes 2分钟后

- atrm 5 删除5号

- 两分钟后执行某个脚本
  ![ly-20241212142140123](img/ly-20241212142140123.png)

## 磁盘分区

- 分区跟文件系统的关系
  (挂载)
  ![ly-20241212142140190](img/ly-20241212142140190.png)
  - 将一个分区挂载到某个目录，用户进入到某个目录，就相当于访问到某个分区了
- lsblk
  ![ly-20241212142140255](img/ly-20241212142140255.png)
- linux分IDE硬盘和SCSI硬盘
  目前基本是SCSI硬盘
- sdx~  x代表abcd，~表示数字
  ![ly-20241212142140321](img/ly-20241212142140321.png)
- lsblk -f 
  ![ly-20241212142140384](img/ly-20241212142140384.png)
  - 文件类型，唯一标识符
- 现在挂载一个分区
  - 如图
    ![ly-20241212142140452](img/ly-20241212142140452.png)
  - 给虚拟机，添加一个硬盘
    ![ly-20241212142140522](img/ly-20241212142140522.png)
  - 重启后，使用lsblk
    ![ly-20241212142140587](img/ly-20241212142140587.png)
  - 进行分区
    - fdisk /dev/sdb 
      ![ly-20241212142140652](img/ly-20241212142140652.png)
    - 之后输入p，
    - 输入分区数（这里是1）
    - 最后一步，输入w ，写入分区并退出
    - 查看
      ![ly-20241212142140719](img/ly-20241212142140719.png)
  - 将分区格式化
     mkfs -t ext4 /dev/sdb1
    - 查看
      ![ly-20241212142140782](img/ly-20241212142140782.png)
  - 进行挂载
    mount  /dev/sdb1 /newdisk/
    ![ly-20241212142140847](img/ly-20241212142140847.png)
  - umount /dev/sdb1
    卸载
    ![ly-20241212142140908](img/ly-20241212142140908.png)
  - 用命令行挂载的指令，重启后挂载关系会消失
    永久挂载：修改/etc/fstab 
    ![ly-20241212142140972](img/ly-20241212142140972.png)
    - 
      ![ly-20241212142141041](img/ly-20241212142141041.png)
- df -h 查看磁盘使用情况
  ![ly-20241212142141105](img/ly-20241212142141105.png)
- du -h --max-depth=1 /opt 
- ls -l /opt | grep "^-" | wc -l  使用正则，并统计数量
- ls -lR /opt  注意，这里加了R，将递归显示
- 使用yum install -y tree
  ![ly-20241212142141169](img/ly-20241212142141169.png)

## 网络配置

- ifconfig 查看ip

- 网络的互通
  ![ly-20241212142141233](img/ly-20241212142141233.png)

- 虚拟网络编辑器
  ![ly-20241212142141296](img/ly-20241212142141296.png)

- 使用ping判断主机间是否互通

- vi /etc/sysconfig/network-scripts/ifcfg-ens33 编辑ip

  ```shell
  TYPE="Ethernet"
  PROXY_METHOD="none"
  BROWSER_ONLY="no"
  DEFROUTE="yes"
  IPV4_FAILURE_FATAL="no"
  IPV6INIT="yes"
  IPV6_AUTOCONF="yes"
  IPV6_DEFROUTE="yes"
  IPV6_FAILURE_FATAL="no"
  IPV6_ADDR_GEN_MODE="stable-privacy"
  NAME="ens33"
  UUID="8c2741af-382a-44a6-b161-aed16a29875d"
  DEVICE="ens33"
  
  BOOTPROTO="static"
  ONBOOT="yes"
  IPADDR=192.168.200.160
  GATEWAY=192.168.200.2
  DNS1=192.168.200.2
  ```

  - 注意最后五行

- 修改hostname
  vim /etc/hostname

  

## 进程

- 每一个执行的程序被称为一个进程，每一个进程都分配一个ID号-
- 每个进程都可以以前台/后台方式运行
- 一半系统服务以后台进程方式存在的
- 使用ps显示进程
  ps -aux
- 一些参数解释
  ![ly-20241212142141360](img/ly-20241212142141360.png)
- 使用grep过滤
  ![ly-20241212142141420](img/ly-20241212142141420.png)
- 进程的父进程
  ps -ef 
  ![ly-20241212142141482](img/ly-20241212142141482.png)
  - 由systemd生成启动其他进程
    ![ly-20241212142141550](img/ly-20241212142141550.png)
  - 
    ![ly-20241212142141615](img/ly-20241212142141615.png)
- 子进程之间关系
  ![ly-20241212142141677](img/ly-20241212142141677.png)
- 进程的终止
  kill / killall
  - killall 将子进程一起杀死
    ![ly-20241212142141743](img/ly-20241212142141743.png)
  - kill -9 强制终止
    ![ly-20241212142141804](img/ly-20241212142141804.png)
  - 如果把sshd杀死，那就再也连不上了
    ![ly-20241212142141864](img/ly-20241212142141864.png)
  - 重新启动sshd
    /bin/systemctl start sshd.service
    ![ly-20241212142141925](img/ly-20241212142141925.png)
  - yum -y install psmisc
  - pstree -u 带上用户
  - pstree -p 带上进程号

## 服务管理

- 服务，本质上就是进程
- service 服务名 start|stop|restart|reload|status 
- centos7.0之后，主要用systemctl 
- 还使用service的命令
  ![ly-20241212142141988](img/ly-20241212142141988.png)
- 网络连接查看
  ![ly-20241212142142048](img/ly-20241212142142048.png)
- 服务的运行级别
  ![ly-20241212142142113](img/ly-20241212142142113.png)
- ![ly-20241212142142173](img/ly-20241212142142173.png)
  systemctl set-default graphical.target //默认进入图形化界面
- 

## rpm管理

## 软件包管理



