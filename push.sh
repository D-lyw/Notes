#! /bin/bash
git add .
echo "输入提交描述（默认‘提交代码’)"
read describe
if [ ! -n "$describe" ]
then
describe = "提交代码"
fi
git commit -m $describe
git push 
<< "liuyuanwang4321@gmail.com"
<< "lyw8975678"
echo "-----OK-----"
