---
title: hugo进阶学习17-20
description: hugo进阶学习17-20
categories:
  - 学习
tags:
  - hugo
published: true
date: 2024-12-09 23:50:43 星期一
updated: 2024-12-09 23:50:43 星期一
---
# Variable
## 文件结构
![](attachments/img/ly-20241210141931324.png)  
## 实战
```go
{{/*layouts\_default\single.html*/}}
{{ define "main" }}
  This is the single template<br>
  {{/* 常见变量 */}}
   title: {{ .Params.title }}<br>
   title: {{   .Title }}<br>
   date: {{ .Date }}<br>
  url: {{ .URL }}<br>
  myvar: {{ .Params.myVar }}<br>
  {{/* 定义变量 */}}
  {{ $myVarname := "aString" }}
  myVarname:{{ $myVarname }}<br>
  <h1 style="color: {{ .Params.color }} ;" >Single Template</h1>
{{ end }} 
```

``` markdown
---
title: "E-title"
date: 2024-12-07T12:43:21+08:00
draft: true
myVar: "myvalue"
color: "red"
---

This is dir3/e.md
```

![](attachments/img/ly-20241210144019859.png)  

其他两个文件效果  
``` markdown
---
title: "F"
date: 2024-12-07T12:43:21+08:00
draft: true
color: "green"
---

This is dir3/f.md
```

![](attachments/img/ly-20241210144426903.png)  

``` markdown
---
title: "This is A's title"
date: 2004-12-04T12:42:49+08:00
draft: true
author: "Mike"
color: "blue"
---

This is A,/a.
```

效果：  
![](attachments/img/ly-20241210144448146.png)  

## 官网详细默认变量

[hugo variables](https://gohugo.io/variables "官方链接")。

# Functions函数
## 文件结构
![](attachments/img/ly-20241210141931324.png)  

## 代码(模板)
注意，下面全是dir1下的模板，只对/dir1/及其下文件有效  
baseof.html  
```html
{{/*layouts\_default\baseof.html*/}}
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  {{ block "main" . }}
    33
  {{ end }}
</body>
</html>
```

single.html  
``` html
{{/*layouts\dir1\single.html*/}}
<html>
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Document111</title>
</head>
<body> 
  Dir1Template,see!
  <h1>Header</h1>
  <h3>{{.Title}}</h3>
  <h4>{{.Date}}</h4> <!--特殊项-->
  {{.Content}}
  <h1>Footer</h1>
  <hr>
  {{ truncate 10 "This is a really long string"}}<br>
  {{ add 1 5 }}<br>
  {{ sub 1 5 }}<br>
  {{ singularize "dogs" }} <br>
  {{/*下面完全没有输出，因为不是list page*/}}
  {{ range .Pages }}
    {{ .Title }}<br>
  {{ end }}
</body>
</html>
```
对于上面的single.html生成的html源码：  
``` html
<html>
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Document111</title> <!--注意这里，说明完全使用layouts\dir1\single.html作为模板，跟baseof.html无关-->
</head>
<body> 
  Dir1Template,see!
  <h1>Header</h1>
  <h3>B-title</h3>
  <h4>2024-12-07 12:43:21 &#43;0800 CST</h4> 
  <p>This is dir1/b.md</p>

  <h1>Footer</h1>
  <hr>
  This is a …<br>
  6<br>
  -4<br>
  dog <br>
  
  
<script data-no-instant>document.write('<script src="/livereload.js?port=1313&mindelay=10"></' + 'script>')</script></body>
</html>
```

![](attachments/img/ly-20241210151809812.png)

list.html  
```
{{/* layouts\dir1\list.html  */}}
{{ define "main" }}
     This is the listTemplate for dir1;<br>
  {{/*下面只输出了dir1下的所有文件(包括子文件夹)*/}}
  {{ range .Pages }}
    {{ .Title }}<br>
  {{ end }}
{{ end }} 
```

![](attachments/img/ly-20241210151744421.png)  

# IfStatements
## 文件结构
![](attachments/img/ly-20241210141931324.png)  

## if代码演示
```html
{{/* layouts\_default\single.html */}}
{{ define "main" }}
     This is the listTemplate<br>
     {{ $var1 := "dog" }}
     {{ $var2 := "cat" }}
     {{ if ge $var1 $var2 }}
          True
     {{ else }}
          False
     {{ end }}
     <br>
     {{ $var3 := 6 }}
     {{ $var4 := 4 }}
     {{ $var5 := 1 }}
     
     {{ if and (le $var3 $var4) (lt $var3 $var5) }}
          var3 is minist
     {{ else if and (le $var4 $var3) (lt $var4 $var5)}}
          var4 is minist
     {{ else }}
          var5 is minist
     {{ end }}
     <br> 
{{ end }} 
```

![](attachments/img/ly-20241210153953444.png)  

## 其他代码展示
``` html
<!--layouts\dir1\single.html-->
<html>
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Document111</title>
</head>
<body> 
  
{{ $title := .Title }}
{{ range .Site.Pages }}
   <a href="{{.URL}}" style=" {{ if eq .Title $title }} background-color: red; {{ end }} ">{{.Title}}</a> 
{{ end }}
  <hr>
</body>
</html>
```
  
![](attachments/img/ly-20241210155405613.png)  

