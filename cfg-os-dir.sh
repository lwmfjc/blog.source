#!/bin/bash
#"pcb"--->"pc上备份配置"
#"pcr"--->"pc上恢复配置"
#"mbb"--->"手机上备份配置"
#"mbr"--->"手机上恢复配置"
n=$#
if [ $n -ne 1 ] ; then
   echo -e "Please set one params.  \npcb-->pc-backup\npcr-->pc-recover\nmbb-->mobile-backup\nmbr-->mobile-recover\n"
    exit 0
fi
x=$1
#注意下面的文件路径问题
if [ $x == "pcb" ] ; then 
    echo "pcb1"
    #备份pc上的source的obsidian配置
    cp -r source/.obsidian source/_os_pc_backup
elif [ $x == "pcr" ] ; then 
    echo "pcr1"
    rm -rf source/.obsidian
    #恢复pc上的source的obsidian配置
    cp -r source/_os_pc_backup source/.obsidian
elif [ $x == "mbb" ] ; then 
    echo "mbb1"
    #备份mobile上的source的obsidian配置
   cp -r source/.obsidian source/_os_mobile_backup
elif [ $x == "mbr" ] ; then 
    echo "mbr1"
    rm -rf source/.obsidian
    #恢复mobile上的source的obsidian配置
    cp -r source/_os_mobile_backup source/.obsidian
fi
exit 1
