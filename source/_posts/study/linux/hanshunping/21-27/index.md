---

title:  linux_韩老师_21-33
description: '用户管理、运行级别、找回root密码、帮助指令、文件目录'
categories:
  - 学习
tags:
  - "linux_韩老师"
date: 2022-05-22 13:04:55
updated: 2022-05-22 13:04:55
---

## 用户管理

- 使用```ssh root@192.168.200.201```进行服务器连接
  ![ly-20241212142135612](img/ly-20241212142135612.png)

- xshell中 ctr+shift+r 用来重新连接

- 用户解释图
  ![ly-20241212142135812](img/ly-20241212142135812.png)

- 添加一个用户milan，会自动创建该用户的家目录milan

  - 当登录该用户时，会自动切换到家目录下
    ![ly-20241212142135882](img/ly-20241212142135882.png)

- 指定家目录
    ![ly-20241212142135954](img/ly-20241212142135954.png)
    
- 指定密码
    ![ly-20241212142136024](img/ly-20241212142136024.png)

- 用milan登录，自动切换到/home/milan 
    pwd:显示当前用户所在的目录

    ![ly-20241212142136094](img/ly-20241212142136094.png)

- 用户删除

    - 删除用户但保留家目录
        - 需要用超级管理员才能删除
          ![ly-20241212142136163](img/ly-20241212142136163.png)
          使用```su -u root```切换到超级管理员
        - 先logout然后再删除
          ![ly-20241212142136235](img/ly-20241212142136235.png)
    - 删除用户及家目录
        ```userdel -r milan```
    - 建议保留家目录

- 查询root用户信息

    - 使用```id xx``` 查询
      ![ly-20241212142136305](img/ly-20241212142136305.png)

- 切换用户 ```su - xx```

    - 从权限高切换到权限低的用户不需要密码；反之需要
        ![ly-20241212142136377](img/ly-20241212142136377.png)
    - 使用logout（exit也行），从root用户回到jack

- 查看当前用户
    ```who am i ```
    ![ly-20241212142136445](img/ly-20241212142136445.png)
    即使切换了用户，返回的还是root（第一次登录时的用户)
    ![ly-20241212142136517](img/ly-20241212142136517.png)

- 用户组（角色）
  
  - 增加、删除组
  
      ```shell
      groupadd wudang
      groupdel wudang
      ```
  
      如果添加用户的时候没有指定组，那么会创建一个跟用户名一样的名字的组
      ![ly-20241212142136586](img/ly-20241212142136586.png)
      id是1002，组为king
  
      ![ly-20241212142136655](img/ly-20241212142136655.png)
  
  - 添加用户zwj，添加组wudang，并将zwj添加到wudang组里面
  
      ```shell
      groupadd wudang
      useradd -g wudang zwj
      ```
  
      ![ly-20241212142136719](img/ly-20241212142136719.png)
  
  - 修改用户所在组
  
      ```shell
      groupadd mojiao
      usermod -g mojiao zwj
      ```
  
      ![ly-20241212142136833](img/ly-20241212142136833.png)
  
- 关于用户和组相关的文件

    - /etc/passwd
        每行的含义
        ![ly-20241212142136904](img/ly-20241212142136904.png)

        ![ly-20241212142136976](img/ly-20241212142136976.png)

        - shell 解释和翻译指令
            一般用bash，还有其他，很多

            ![ly-20241212142137045](img/ly-20241212142137045.png)

            ![ly-20241212142137113](img/ly-20241212142137113.png)

    - /etc/shadow 口令配置文件

        每行的含义
        ![ly-20241212142137181](img/ly-20241212142137181.png)

        ![ly-20241212142137248](img/ly-20241212142137248.png)

    - /etc/group 记录组的信息
        组名：口令：组标识号：组内用户列表

        ![ly-20241212142137315](img/ly-20241212142137315.png)


## 运行级别

- 基本介绍

  - 0 关机
  - 1 单用户（找回密码）
  - 2 多用户状态没有网络服务
  - 3 多用户状态有网络服务
  - 4系统未使用保留给用户
  - 5 图形界面
  - 6 系统重启

- 在图形界面输入```init 3``` 会直接进入终端界面

  - 之后输入```init 5``` 会重新进入图形界面

- ```init 0 ```会直接关机

- 指定默认级别
  centosOS7之前，在/etc/inittab文件中
  之后进行了简化，如下
  ![ly-20241212142137383](img/ly-20241212142137383.png)

- 查看默认级别

  ```shell
  systemctl get-default
  # multi-user.target 
  ```

- 设置默认级别

  ```shell
  systemctl set-default multi-user.target
  ```

  

## 找回root密码

- 这里讲的是centos os7之后

- 重启后，立马按e

- 然后光标往下滑
  ![ly-20241212142137450](img/ly-20241212142137450.png)

  - 在utf-8后面，加入 init=/bin/sh （进入单用户实例，注意 这里不要加入空格）

  - 然后ctrl+x 表示启动

  - 然后输入

    ```shell
    mount -o remount,rw /
    passwd
    ```

  - 修改成功
    ![ly-20241212142137521](img/ly-20241212142137521.png)

  - 然后再输入 

    ```shell
    touch /.autorelabel 
    exec /sbin/init
    ```

  - ```exec /sbin/init ```之后时间比较长，等待一会，密码则生效

    ![ly-20241212142137590](img/ly-20241212142137590.png)(卡住两三分钟)

  - ssh root@192.168.200.201 登录成功

## 帮助指令

- man ls
  ![ly-20241212142137660](img/ly-20241212142137660.png)

  - linux中，隐藏文件以 . 开头（以点开头）
  - 输入q退出man
  - ls选项可以组合使用
  - ls -l 单列输出(use a long listing format)，信息最全
    ![ly-20241212142137727](img/ly-20241212142137727.png)
  - ```ls -la ``` 单列输出，包括隐藏文件
    ![ly-20241212142137796](img/ly-20241212142137796.png)
  - ``` ls -al /root```
    显示/root目录下的内容

- help 内置命令的帮助信息

  - 该命令在zsh下不能用，所以使用下面指令切换
    ```shell
    chsh -s /bin/bash #zsh切换到bash，重启后生效
    chsh -s /bin/zsh #bash切换到zsh，重启后生效
    ```

  
```help cd```
  ![ly-20241212142137867](img/ly-20241212142137867.png)

- End

