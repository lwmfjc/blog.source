---
title: obsidian-theme
description: obsidian-theme
categories:
  - 学习
tags:
  - obsidian 
date: 2024-12-03 15:32:01  
updated: 2024-12-03 15:32:01  
---
# 主题推荐
1. Neumorphism-dark.json  
    ![](attachments/img/ly-20241203153227721.jpg)
2. Sunset-base64.json  ✔
   ![](attachments/img/ly-20241203153500060.jpg)
3. Obsidian-default-dark-alt  ✔
   ![](attachments/img/ly-20241203154015522.jpg)  
   4. Obsidian-default-light-alt 
      ![](attachments/img/ly-20241203171742934.jpg)
 
8. Neumorphism.json 
   ![](attachments/img/ly-20241203154902114.jpg)
12. eyefriendly  ✔
    ![](attachments/img/ly-20241203155404808.jpg)
13. boundy   ✔
    ![](attachments/img/ly-20241203155444312.jpg)
flexoki-light 
![](attachments/img/ly-20241203171922664.jpg)Borderless-light 
![](attachments/img/ly-20241203172002669.jpg)

# 关于obsidian主题border的背景图片设置  
配合StyleSettings，在StyleSettings的这里设置  
![](attachments/img/ly-20241204074122760.jpg)  
## 暂不明确
background中貌似存在转换规则，不是直接用url("")这个形式把图片base64放进来就可以了，目前觉得可能的转换规则  
```shell
%3c 48+12=60  <
%3e 48+14=62   >
%23 32+3=35    #  
#下面的好像没用到，也不确定
%2b  32+11=43  + 
%3b ;
%2c ,
```
后续见另一篇文章   
[border-theme](_posts/study/obsidian/border-theme.md)
{% post_link 'study/obsidian/border-theme' 'helo' %}