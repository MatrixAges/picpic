<p align="center"><a href="#" target="_blank" rel="noopener noreferrer"><img width="200" src="https://matrixage.github.io/img/projects/picpic/logo_picpic_black.png" alt="picpic logo"></a></p>

# <p align="center"> picpic </p>

_<p align="center">一个图床应用，好看且好用，基于github pages和github actions.</p>_

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/join-welcome-brightgreen.svg" alt="attitude_img"></a>
  <a href="#"><img src="https://img.shields.io/badge/version-1.0-orange.svg" alt="version_img"></a>
  <a href="#"><img src="https://img.shields.io/badge/compres%20size-7k-red.svg" alt="size_img"></a>
  <a href="#"><img src="https://img.shields.io/badge/style-light%20design-yellow.svg" alt="style_img"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

## 文档

[EN](https://github.com/MatrixAges/picpic) | [中文文档](https://github.com/MatrixAges/picpic/blob/master/readme_cn.md)

## 安装

通过 npm 安装:

```bash
$ npm i @matrixage/picpic
```

## 使用方式

通过如下步骤即可使用 picpic 创建你的个人图床:

- 创建一个文件夹，然后进入它，并打开终端
- 执行 `npm init` 一路enter下去
- 执行 `npm i @matrixage/picpic`
- 打开package.json，把`"init": "picpic init"` 加入到  `scripts`字段中
- 执行`npm run init`
- 然后把你的图片移动到 `assets` 文件夹中
- 执行`git commit` & `git push` 推送你的代码到github

github actions 检测到项目中 .github 文件夹下的部署脚本之后，将会启动自动化构建把你的图片打包编译到 gh-pages 分支上去。

然后激活你的 gh-pages，在 github 项目的页面中的 tab 的最后一项 settings 中找到：

![gh-pages](https://matrixage.github.io/img/projects/picpic/choose_gh_pages.jpg)

如果你没有使用过 github actions ，你需要激活你的 github actions 功能，然后才能通过部署脚本触发自动构建流程.

如果你发现生成的图片链接可以访问，但是放在github的readme.md中无法显示，那最有可能是 `githubusercontent.com` 被本地服务商DNS污染，解决方案是加入如下DNS解析到你的hosts文件中：

```
199.232.96.133 raw.githubusercontent.com
199.232.96.133 camo.githubusercontent.com
```

如果你发现访问github很慢，那是因为本地服务商在进行DNS网络过滤，加入如下host跳过服务商网络过滤：

```
140.82.112.3 github.com
```

如果你的仓库的主分支是master而不是main，请自行修改构建脚本依赖分支为master，在.github/workflows/ci.yml中。

## 预览

![picpic_example](https://matrixage.github.io/img/projects/picpic/picpic_example.jpg)

## Tricks

点击图片可以查看更多细节:
![preview_detail](https://matrixage.github.io/img/projects/picpic/preview_detail.jpg)

点击右上角的文件夹图标可以进入文件夹模式:
![picpic_ex_folder](https://matrixage.github.io/img/projects/picpic/picpic_ex_folder.jpg)

在移动端同样是可以使用的:
![preview_mobile](https://matrixage.github.io/img/projects/picpic/preview_mobile.jpg)

更多功能请自行探索:

- 列表模式
- 搜索
- 导航
- 小型的文件系统

如果你有自己的需求，而且你认为你的需求合理的话，可以通过issue或者discussion提给我，如果确实有价值，我会实现，当然，你也可以自行实现。

## Accessibility

Picpic支持所有现代浏览器，建议使用chrome或是firefox进行访问。

## License

Picpic 使用的是开放的MIT协议。 (http://opensource.org/licenses/MIT)
