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
    /*
    <iframe src='/myjs/pdfjs/web/viewer.html?file=/attachments/hello.pdf' marginwidth ="0" frameborder="no" scrolling="no"  style="padding: 0;width:100%;height: 0px;width: 0px;"></iframe>
     */
    //忽略iframe链接打开本地pdf的渲染
    data.content = data.content.replace(/<iframe.*iframe>/g,
        function (match_str) {
            //\1是回溯引用，第一个括号匹配到的内容
            // \\双斜杠表示匹配\开头，即相对路径
            if (match_str.search(/src\s*=\s*(['"])[/\\].+\.pdf\s*\1/g)!==-1) {
                return "";
            } else {
                return match_str;
            }
        });
    /*
    <a  href="/myjs/pdfjs/web/viewer.html?file=/attachments/pdf/hello.pdf" target="_blank">第九回 齐侯送文姜婚鲁 祝聃射周王中肩</a>
     */
    //忽略链接打开本地pdf的渲染
    data.content = data.content.replace(/<a.*a>/g,
        function (match_str) {
            //\1是回溯引用，第一个括号匹配到的内容
            // \\双斜杠表示匹配\开头，即相对路径
            if (match_str.search(/href\s*=\s*(['"])[/\\].+\.pdf\s*\1/g)!==-1) {
                return "";
            } else {
                return match_str;
            }
        });
    //忽略excalidraw链接
    data.content = data.content.replace(/%%.*%%/g,
        function (match_str) {
            if(match_str.includes("Excalidraw")){
                console.debug(match_str+"----------------------------------------------------------------------");
            }
            //\1是回溯引用，第一个括号匹配到的内容
            // \\双斜杠表示匹配\开头，即相对路径
            return "";
        });
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
