---
title: hugo进阶学习02
description: hugo进阶学习02
categories:
  - 学习
tags:
  - hugo
published: true
date: 2024-12-08 11:23:42 星期日
updated: 2024-12-08 11:23:42 星期日
---
>这里使用的版本是**v0.26**（很久之前的版本）

# template basic
模板分为list template和single template  
## 文件夹结构
content目录结构  
![](attachments/img/ly-20241208180244621.png)
## list template （列表模板）  
![](attachments/img/ly-20241208115539651.png)  
  
  ![](attachments/img/ly-20241208115627708.png)
## single template （单页模板）
![](attachments/img/ly-20241208115455162.png)  
## 特点
所有的**列表之间**都是长一样的（页眉，页脚，及内容（都是列表））  
所有的**单页之间**都是长一样的（一样的页眉页脚，一样的内容布局）  
## 部分代码解释
![](attachments/img/ly-20241208120456973.png)  
### 单页探索
![](attachments/img/ly-20241208120836428.png)  
![](attachments/img/ly-20241208120735767.png)  

# list page templates
## 文件夹结构
![](attachments/img/ly-20241208180521240.png)  
## 文件内容
```toml 
#content/_index
---
title: "_Index" 
---

This is the home page
#content/dir1/_index
---
title: "_Index"
---

This is the landing page for dir1
```
## 当前效果  
![](attachments/img/ly-20241208180816608.png)  

![](attachments/img/ly-20241208180907481.png)  

## 原因 
```html
<!--themes\ga-hugo-theme\layouts\_default\list.html-->
<html>

<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Document</title>
</head>

<body>
     {{ partial "header" (dict "Kind" .Kind "Template" "List") }}
     {{.Content}}
     {{ range .Pages }}
     <div style="border: 1px solid black; margin:10px; padding:10px; ">
          <div style="font-size:20px;">
               <a href="{{.URL}}">{{.Title}}</a>
          </div>
          <div style="color:grey; font-size:16px;">{{ dateFormat "Monday, Jan 2, 2006" .Date }}</div>
          <div style="color:grey; font-size:16px;">{{ if .Params.tags }}<strong>Tags:</strong> {{range .Params.tags}}<a
                    href="{{ " /tags/" | relLangURL }}{{ . | urlize }}">{{ . }}</a> {{end}}{{end}}</div>
          <div style="color:grey; font-size:16px;">{{ if .Params.categories }}<strong>Categories:</strong> {{range
               .Params.categories}}<a href="{{ " /categories/" | relLangURL }}{{ . | urlize }}">{{ . }}</a>
               {{end}}{{end}}</div>
          <div style="color:grey; font-size:16px;">{{ if .Params.moods }}<strong>Moods:</strong> {{range
               .Params.moods}}<a href="{{ " /moods/" | relLangURL }}{{ . | urlize }}">{{ . }}</a> {{end}}{{end}}</div>

          <p style="font-size:18px;">{{.Summary}}</p>
     </div>
     {{ end }}
     {{ partial "footer" . }}
</body>

</html>
```
## 覆盖默认的list template
编辑文件并保存  
```html 
<!--layouts\_default\list.html-->
<html>
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Document</title>
</head>
<body>
     {{.Content}}  <!--显示对应的目录下的_index.md内容-->
     {{ range .Pages  }} <!--枚举对应目录下所有页面(.md)-->
          <ul>
	          <!--.URL 文件路径，类似 /a或者/dir1/b-->
	          <!--.Title md中的前言-title字段-->
               <li><a href="{{.URL}}">{{.Title}}</a></li>
          </ul> 
     {{end}}
</body>
</html>
```
## 效果
list template简易版  
![](attachments/img/ly-20241208181937373.png)  

![](attachments/img/ly-20241208182033315.png)  
# single template
