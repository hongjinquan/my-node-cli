#!/usr/bin/env node

const path = require("path")
// 核心处理模块
const program = require("commander")
// shell
const shell = require("shelljs")
// 美化终端字符显示
const chalk = require("chalk")
// 与用户交互
const inquirer = require("inquirer")
// loading 模块
const ora = require("ora")
// 下载git库
const download = require("download-git-repo")
// 模板文件
const template = "direct:https://github.com/EchoHGX/express-demo.git"

const verStr = [
    `___________      .__`,
    '\\_   _____/ ____ |  |__  ',
    ' |    __)__/ ___\\|  |  \\ ',
    ' |        \\  \\___|   Y  \\',
    '/_______  /\\___  >___|  /',
    '        \\/     \\/     \\/',
    'ech cli of node',
    '',
    `version: ${chalk.green(require("../package.json").version)}`
].join('\n')

program.version(verStr, "-V,--version")

program.option('-i, --integer <n>', 'An integer argument')

const bindHandler = {
    init() {
        inquirer
            .prompt([
                {
                    type: 'text',
                    message: '请输入文件名称',
                    name: 'dirname'
                },
                {
                    type: 'list',
                    message: '请选择对应的语言',
                    choices: ['TypeScript', , 'EcmaScript'],
                    name: 'kind'
                }
            ])
            .then(res => {
                console.log('用户的反馈,', res)
                const dirname = res.dirname
                if (dirname) {
                    const loading = ora("下载初始化模板中...")
                    loading.start()
                    const _projectPath = path.join(process.cwd(), dirname)
                    download(template, _projectPath, { clone: true }, err => {
                        loading.stop()
                        if (err) {
                            console.error(chalk.red('出错了' + err));
                        } else {
                            //将下载下来的模板的package名称替换掉
                            shell.sed('-i', 'app', dirname, _projectPath + '/package.json')
                            console.log(chalk.green('项目创建成功'))
                        }
                    })
                }
            })
    }
}

program
    .usage('[cmd] <options>')
    .arguments('<cmd> [env]')
    .action((cmd, params) => {
        const handler = bindHandler[cmd]
        if (typeof handler === 'undefined') {
            console.log(`${chalk.yellow('没有')}[${chalk.red(cmd)}]${chalk.yellow('命令')}`)
            process.exit(1)
        } else {
            handler(params)
        }
    })

program.parse(process.argv)