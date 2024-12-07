'use strict';

//hide attachments with .pdf 
//eg. ![](xxx.pdf xxxxdfdfsss)
hexo.extend.filter.register('before_post_render', function (data) {
    /**
    ====================
    huogo中：layouts/_default/_markup/render-image.html 修改
    {{- if $isCustomSrc -}}
      {{- if (strings.HasSuffix $src ".pdf") -}} 
      		{{ $shouldEmpty = true }}
       {{ else }}
       	{{ $src = add "/" $src }} 
      {{ end }}
   {{- end -}}
   
     * pdf的img渲染
     * ![ly-pdf](attachments/book/横格中.pdf)
     * 下面这个正则前半部分从别人那里烤来的，有点复杂，先这样。简单点的也能用，先用他这个复杂的，目前看不懂啥意思
     */
    data.content = data.content.replace(/!{1}\[([^\[\]]*)\]\(.+.pdf.*\)?\)/g,"");
    /**
    * 建议用css+正则
     * 忽略iframe链接打开本地pdf的渲染
     *<iframe src='/myjs/pdfjs/web/viewer.html?file=/attachments/hello.pdf' marginwidth ="0" frameborder="no" scrolling="no"  style="padding: 0;width:100%;height: 0px;width: 0px;"></iframe>
     */
    data.content = data.content.replace(/<iframe.+src\s*=\s*(['"])[/\\].+\.pdf\s*\1.+iframe>/g,"");
    /**
    * 建议用css+正则
     * 忽略链接打开本地pdf的渲染
     * <a  href="/myjs/pdfjs/web/viewer.html?file=/attachments/pdf/hello.pdf" target="_blank">第九回 齐侯送文姜婚鲁 祝聃射周王中肩</a>
     */
    data.content = data.content.replace(/<a.+href\s*=\s*(['"])[/\\].+\.pdf\s*\1.+a>/g,"");
    /**
    * ======================
    * hugo中，在layouts/_default/single.html中添加  {{- $ct := .Content -}} 
      {{ $ct = (replaceRE "%%.+%%" "" $ct) }}  
      {{-   $ct   | safe.HTML -}}
      ======================
      或者hugo.toml中使用markup.goldmark.extensions.passthrough.delimiters以及layouts/_default/_markup/render-passthrough.html中添加
      {{ if eq .Type "inline" }}
  		{{ .Inner  }} //要另外加判断逻辑 推荐
	{{ else }}
  		{{ .Inner  }}
{{ end }}
      =======================
     * 忽略excalidraw链接
     * %%[xxxEdit in Excalidraw](attachments/img/ecd-20241202113023866.md)%%
     */
    data.content = data.content.replace(/%%.*%%/g, "");
    return data;
});
/*
//package.json
{
    "name": "hexo-0ly4obsidian",
    "version": "0.0.6",
    "main": "index",
    "description": "handle obsidian file.",
    "keywords" : [
        "hexo",
        "obsidian",
        "path",
        "markdown"
    ],
    "license" : "MIT",
    "author" : {
        "name" : "Liu Yi"
    }
}
//index.js
'use strict';

//hide attachments with .pdf 
//eg. ![](xxx.pdf xxxxdfdfsss)
hexo.extend.filter.register('before_post_render', function (data) {
    data.content = data.content.replace(/!{1}\[([^\[\]]*)\]\((.*)\s?(?:".*")?\)/g,
        function (match_str) {
            if (/(.pdf.*\))$/g.test(match_str)) {
                return "";
            } else {
                return match_str;
            }
        }); 
    data.content = data.content.replace(/<iframe.*iframe>/g,
        function (match_str) {
            //\1是回溯引用，第一个括号匹配到的内容
            // \\双斜杠表示匹配\开头，即相对路径
            if (match_str.search(/src\s*=\s*(['"])[/\\].+\.pdf\s*\1/g)) {
                return "";
            } else {
                return match_str;
            }
        });
    return data;
});
//README.md
xxxx
*/
