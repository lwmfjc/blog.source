#!/bin/bash
#"pl"--->"拉取blog和book"
#"ps"--->"推送blog和book"
n=$#
if [ $n -ne 1 ] ; then
   echo -e "Please set one params.  \npl-->blog pull from github,book pull from k40s\nps-->blog ps to github,book ps to k40s\n"
    exit 0
fi
x=$1
#注意下面的文件路径问题
if [ $x == "pl" ] ; then 
    echo "plgithub--start"
    git pull || proxychains git pull
    echo "plgithub--end"
    #blog推送到github
    echo "plk40--start"
    #从k40拉取
    cd source/attachments/book
    git pull || proxychains git pull
    echo "plk40--end"
elif [ $x == "ps" ] ; then 
    #blog推送到github
    echo "psgithub--start"
    git add .
    git commit -m "commit_auto massage"
    git push || proxychains git push
    echo "psgithub--end"
    #推送到k40
    echo "psk40--start"
    cd source/attachments/book
    git add .
    git commit -m "commit_auto massage"
    git push || proxychains git push
    echo "psk40--end" 
fi
exit 1