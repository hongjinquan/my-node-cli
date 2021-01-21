# my-node-cli
自我学习，编写node的cli。
## 一、安装包介绍
* commander - 处理核心命令
* chalk  —  美化终端字符显示
* figlet  —  在终端输出大型字符
* inquirer  —  命令行参数输入交互
* shelljs  —  平台相关命令
* ora - 实行loading效果
* download-git-repo - 下载git模块

## 二、书写简单的脚本
1. 在项目的package.json添加bin配置；
2. 在bin的目录下创建脚本文件

## 三、全局使用命令(项目根目录下执行)
> npm link

## 四、简单使用
1. ech -V 查看版本号
2. ech -h 查看帮助
3. ech init 初始化项目（完成后后在项目的目录下生成一个文件夹，以自己在命令行输入的名称命名）