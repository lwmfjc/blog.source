---
title: 01-21 maven多模块管理_动力节点
description: 'maven多模块管理_动力节点'
categories:
  - 学习
tags:
  - maven多模块管理_动力节点
date: 2022-07-17 09:49:30
updated: 2022-07-17 09:49:30
---

## 场景介绍

- 业务依赖
  ![ly-20241212142142250](img/ly-20241212142142250.png)
- 多模块管理
  版本管理
  ![ly-20241212142142435](img/ly-20241212142142435.png)

## 第1种方式

### 创建父工程

- 先创建一个空项目
  ![ly-20241212142142506](img/ly-20241212142142506.png)
- 在这个空项目下，创建一个module当作maven父工程
  ![ly-20241212142142569](img/ly-20241212142142569.png)
- 结构
  ![ly-20241212142142631](img/ly-20241212142142631.png)

- pom文件

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>
  
      <groupId>com.bjpowernode.maven</groupId>
      <artifactId>001-maven-parent</artifactId>
      <version>1.0.0</version>
      <!--
       packaging 标签指定打包方式，默认为jar
      -->
      <!--
          maven父工程必须遵守以下两点要求
          1、packaging标签的文本内容必须设置为pom
          2、把src删除
      -->
  
  
  </project>
  ```

  

### 介绍pom文件

pom 项目对象模型，project object model，该文件可以子工程被继承
maven多模块管理，其实就是让它的子模块的pom文件来继承父工程的pom

### 创建maven java子工程

- 新建一个module

  注意路径，002在IDEA-maven的目录下
  ![ly-20241212142142693](img/ly-20241212142142693.png)

- 查看pom文件

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <!--指向父工程的gav坐标-->
      <parent>
          <artifactId>001-maven-parent</artifactId>
          <groupId>com.bjpowernode.maven</groupId>
          <version>1.0.0</version>
          <!--相对路径-->
          <relativePath>../001-maven-parent/pom.xml</relativePath>
      </parent>
      <modelVersion>4.0.0</modelVersion>
  
      <artifactId>002-maven-java</artifactId>
  
  
  </project>
  ```

### 创建maven web子工程

- 创建新模块
  ![ly-20241212142142754](img/ly-20241212142142754.png)

- 查看pom

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <parent>
          <artifactId>001-maven-parent</artifactId>
          <groupId>com.bjpowernode.maven</groupId>
          <version>1.0.0</version>
          <relativePath>../001-maven-parent/pom.xml</relativePath>
      </parent>
      <modelVersion>4.0.0</modelVersion>
  
      <artifactId>003-maven-web</artifactId>
      <packaging>war</packaging>
   
  </project>
  
  ```

  


### 修改子工程为父工程

​	1 父工程的pom.xml种的packaging标签的文本内容必须设置pom

​	2 删除src目录

- 如图，比如这里修改002-maven-java为父工程
  ![ly-20241212142142815](img/ly-20241212142142815.png)

- 添加004为002的子工程
  ![ly-20241212142142876](img/ly-20241212142142876.png)

- 查看pom文件

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <parent>
          <artifactId>002-maven-java</artifactId>
          <groupId>com.bjpowernode.maven</groupId>
          <version>1.0.0</version>
          <relativePath>../002-maven-java/pom.xml</relativePath>
      </parent>
      <modelVersion>4.0.0</modelVersion>
  
      <artifactId>004-maven-java-1</artifactId>
  
      <properties>
          <maven.compiler.source>8</maven.compiler.source>
          <maven.compiler.target>8</maven.compiler.target>
      </properties>
  
  </project>
  ```

  

### 手动修改Maven工程为子工程(非idea中)

- 这里说的是，创建子工程的时候，没有选择父工程
  创建完之后的pom.xml

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>
  
      <groupId>com.bjpowernode.maven</groupId>
      <artifactId>005-maven-java</artifactId>
      <version>1.0.0</version> 
  
  </project>
  ```

- 修改（添加parent标签即可）

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <parent>
          <artifactId>001-maven-parent</artifactId>
          <groupId>com.bjpowernode.maven</groupId>
          <version>1.0.0</version>
          <relativePath>../001-maven-parent/pom.xml</relativePath>
      </parent>
      <modelVersion>4.0.0</modelVersion>
  
      <artifactId>005-maven-java</artifactId>
  
  </project>
  ```

- 注意
  ![ly-20241212142142941](img/ly-20241212142142941.png)

### 子模块继承父工程所有依赖

- 比如在父工程添加这块依赖

  ```xml
      <dependencies>
          <dependency>
              <groupId>junit</groupId>
              <artifactId>junit</artifactId>
              <version>4.12</version>
          </dependency>
          <dependency>
              <groupId>mysql</groupId>
              <artifactId>mysql-connector-java</artifactId>
              <version>5.1.46</version>
          </dependency>
          <dependency>
              <groupId>com.alibaba</groupId>
              <artifactId>dubbo</artifactId>
              <version>2.5.3</version>
          </dependency>
      </dependencies>
  ```

- 如下
  父工程添加的依赖，所有子模块会无条件继承

  ![ly-20241212142142999](img/ly-20241212142142999.png)

### 父工程管理依赖

- 依赖冗余的问题
  ![ly-20241212142143060](img/ly-20241212142143060.png)

- 加强管理

  ```xml
   <!--加强管理-->
      <dependencyManagement>
          <dependencies>
              <dependency>
                  <groupId>junit</groupId>
                  <artifactId>junit</artifactId>
                  <version>4.12</version>
              </dependency>
              <dependency>
                  <groupId>mysql</groupId>
                  <artifactId>mysql-connector-java</artifactId>
                  <version>5.1.46</version>
              </dependency>
              <dependency>
                  <groupId>com.alibaba</groupId>
                  <artifactId>dubbo</artifactId>
                  <version>2.5.3</version>
              </dependency>
          </dependencies>
      </dependencyManagement>
  ```

- 结果，依赖都没有了
  ![ly-20241212142143121](img/ly-20241212142143121.png)

### 子工程声明式继承父工程依赖

- 比如002-maven-java（子模块，但又是004的父工程）需要mysql

  ```xml
  	<dependencies>
          <dependency>
              <groupId>mysql</groupId>
              <artifactId>mysql-connector-java</artifactId>
          </dependency>
      </dependencies>
  ```

- 效果
  ![ly-20241212142143202](img/ly-20241212142143202.png)

  - 子模块依赖的版本号继承父工程依赖的版本号
  - 如果子模块指定以来的版本号，那就不会继承父工程依赖的版本号

### 父工程管理依赖版本号

- 使用properties变量

  ```xml
      <properties>
          <!--自定义标签名称-->
          <!--约定：通常管理依赖版本号的标签名：项目名称-字段version，
  		项目名称.字段version-->
          <junit-version>4.12</junit-version>
          <mysql-connector-java-version>5.1.46</mysql-connector-java-version>
          <dubbo-version>2.5.3</dubbo-version>
      </properties>
  
  <!--加强管理-->
      <dependencyManagement>
          <dependencies>
              <dependency>
                  <groupId>junit</groupId>
                  <artifactId>junit</artifactId>
                  <version>${junit-version}</version>
              </dependency>
              <dependency>
                  <groupId>mysql</groupId>
                  <artifactId>mysql-connector-java</artifactId>
                  <version>${mysql-connector-java-version}</version>
              </dependency>
              <dependency>
                  <groupId>com.alibaba</groupId>
                  <artifactId>dubbo</artifactId>
                  <version>${dubbo-version}</version>
              </dependency>
          </dependencies>
      </dependencyManagement>
  ```

  

### 回顾第1种实现方式

- 父工程的要求
- 子工程的添加
- 子工程改为父工程
- 子工程和父工程是平级的
  ![ly-20241212142143284](img/ly-20241212142143284.png)
- 父工程加强管理
  ```<dependencyManagement></<dependencyManagement>```
- 注意，第一种方法父工程的pom.xml中，这个也应该是必须的
  ![ly-20241212142143346](img/ly-20241212142143346.png)

## 第2种方式

### 创建父工程

- 最顶层创建一个工程（父工程）
  ![ly-20241212142143408](img/ly-20241212142143408.png)

- pom文件（未处理）

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
  
    <groupId>com.bjpowernode.maven</groupId>
    <artifactId>maven-parent</artifactId>
    <version>1.0.0</version>
    <packaging>war</packaging>
   
  </project>
  
  ```

  - 目录结构(未处理)
    ![ly-20241212142143470](img/ly-20241212142143470.png)

- 处理后
  pom.xml

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
  
    <groupId>com.bjpowernode.maven</groupId>
    <artifactId>maven-parent</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>
    <!--
      1.packaging标签文本内容必须设置为pom
      2.删除src目录
    -->
  </project>
  
  ```

  - 结构
    ![ly-20241212142143534](img/ly-20241212142143534.png)

### 创建子工程

![ly-20241212142143593](img/ly-20241212142143593.png)

- 子工程的pom.xml

  ```
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <!--指向父工程-->
      <parent>
          <artifactId>maven-parent</artifactId>
          <groupId>com.bjpowernode.maven</groupId>
          <version>1.0.0</version>
          <!--注意，这里不需要找pom.xml，因为该子工程和父工程的pom.xml同级-->
      </parent>
      <modelVersion>4.0.0</modelVersion>
  
      <artifactId>maven-java-001</artifactId>
  
  </project>
  ```

- 父工程的pom.xml

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
  
    <groupId>com.bjpowernode.maven</groupId>
    <artifactId>maven-parent</artifactId>
    <version>1.0.0</version>
    
    <!--父工程包含的所有子模块-->
    <modules>
      <module>maven-java-001</module>
    </modules>
    <packaging>pom</packaging>
    <!--
      1.packaging标签文本内容必须设置为pom
      2.删除src目录
    -->
  </project>
  
  ```

- 第二个子模块

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <parent>
          <artifactId>maven-parent</artifactId>
          <groupId>com.bjpowernode.maven</groupId>
          <version>1.0.0</version>
      </parent>
      <modelVersion>4.0.0</modelVersion>
  
      <artifactId>maven-web-001</artifactId>
      <packaging>war</packaging>
   
  </project>
  
  ```

  - 父工程pom.xml的变化
    ![ly-20241212142143655](img/ly-20241212142143655.png)

### 创建子工程的子工程

- 父工程必须遵循

  - packaging标签文本内容设置为pom
  - 删除src目录

- 创建子工程
  ![ly-20241212142143715](img/ly-20241212142143715.png)

- maven-java-001的pom.xml查看

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <!--指向父工程-->
      <parent>
          <artifactId>maven-parent</artifactId>
          <groupId>com.bjpowernode.maven</groupId>
          <version>1.0.0</version>
          <!--注意，这里不需要找pom.xml，因为该子工程和父工程的pom.xml同级-->
      </parent>
      <modelVersion>4.0.0</modelVersion>
  
      <artifactId>maven-java-001</artifactId>
      <packaging>pom</packaging>
      <modules>
          <module>maven-java-0101</module>
      </modules>
  
  </project>
  ```

  - 子模块的pom.xml

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <parent>
            <artifactId>maven-java-001</artifactId>
            <groupId>com.bjpowernode.maven</groupId>
            <version>1.0.0</version>
        </parent>
        <modelVersion>4.0.0</modelVersion>
    
        <artifactId>maven-java-0101</artifactId> 
    
    </project>
    ```

### 父工程管理依赖

- 父工程的pom文件
  ![ly-20241212142143772](img/ly-20241212142143772.png)
- 子模块也一起继承了
  ![ly-20241212142143831](img/ly-20241212142143831.png)
- 父工程管理所有依赖
  ![ly-20241212142143889](img/ly-20241212142143889.png)
- 如果子工程需要，则使用声明式依赖
  ![ly-20241212142143946](img/ly-20241212142143946.png)
  - 也可以自己指定版本号
    

### 父工程管理依赖的版本号

- 使用properties管理版本号，和第一种方式一样
  

### 子工程继承父工程编译插件

![ly-20241212142144003](img/ly-20241212142144003.png)

修改之后，这里为了看效果，改成1.6

```xml
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.1</version>
        <configuration>
          <source>1.6</source>
          <target>1.6</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
```



![ly-20241212142144062](img/ly-20241212142144062.png)

## 第3种方式

前面两种混合使用

先创建一个空项目
![ly-20241212142144120](img/ly-20241212142144120.png)

然后假设有三个父工程
![ly-20241212142144181](img/ly-20241212142144181.png)

然后每个父工程又都有子模块
![ly-20241212142144239](img/ly-20241212142144239.png)