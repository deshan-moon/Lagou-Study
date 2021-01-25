#!/usr/bin/env node

// Node Cli 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为755 这样这个文件才可以作为cli的应用入口
// 具体就是通过 chomd 755 cli.js 实现修改

// console.log('moon')

// 脚手架的工作过程：
// 1、通过命令行交互询问用户问卷
// 2、根据用户回答的结果生成文件

const fs = require('fs')
const path = require('path')

// 在Node中发起命令行交互询问使用inquire模块
const inquirer =require('inquirer')

const ejs = require('ejs')

// prompt方法用于发起命令行交互询问，接收数组参数
// type指定询问方式;name指定
inquirer.prompt([
  {
    type:'input',
    name:'name',
    message:'Project name?',
  } 
])
.then(anwsers => {
  // console.log(anwsers)
  // 根据用户输入生成文件

  // 模板目录
  const tmplDir = path.join(__dirname,"templates")
  // 目标目录
  const destDir = process.cwd()

  // 将模板下的文件全部转换到目标目录
  fs.readdir(tmplDir,(err,files) =>{
    if(err) throw err;
    files.forEach(file =>{
      // 通过模板引擎渲染相对应的路径
      ejs.renderFile(path.join(tmplDir,file),anwsers,(err,result)=>{
        if(err) throw err;

        fs.writeFileSync(path.join(destDir,file),result)
      })
    })
  })
})