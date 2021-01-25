## 项目结构说明

- src：前端代码
- public：网页图标
- .editorconfig：定义代码格式
- .gitignore：git上传需要忽略的文件
- .npmrc：镜像源配置文件
- .travis.yml：配置文件描述
- gulpfile.js：构建任务的配置文件
- LICENSE：许可证
- package.json：项目基本信息
- pages.config.js：项目路径配置与项目页面默认数据
- README.md ：项目说明文档

### 文件结构约定

- 文件夹约定
  - assets：CSS/JS/images/fonts 存发对应目录
  - layouts/partials：Html存放目录
    ![image-20210123154312866](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210123154312866.png)

### 项目运行

npx clean 清除打包文件

npx build 上线前运行的任务

npx develop 运行开发服务器