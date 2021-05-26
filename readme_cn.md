<p align="center"><a href="#" target="_blank" rel="noopener noreferrer"><img width="200" src="https://matrixage.github.io/img/projects/picpic/logo_picpic_black.png" alt="picpic logo"></a></p>

# <p align="center"> picpic </p>

_<p align="center">一个图床应用，好看且好用，基于 github pages 和 github actions.</p>_

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
- 执行 `npm init` 一路 enter 下去
- 执行 `npm i @matrixage/picpic`
- 打开 package.json，把`"init": "picpic init"` 加入到 `scripts`字段中
- 执行`npm run init`
- 然后把你的图片移动到 `assets` 文件夹中
- 执行`git commit` & `git push` 推送你的代码到 github

github actions 检测到项目中 .github 文件夹下的部署脚本之后，将会启动自动化构建把你的图片打包编译到 gh-pages 分支上去。

然后激活你的 gh-pages，在 github 项目的页面中的 tab 的最后一项 settings 中找到.

如果你没有使用过 github actions ，你需要激活你的 github actions 功能，然后才能通过部署脚本触发自动构建流程.

如果你发现生成的图片链接可以访问，但是放在 github 的 readme.md 中无法显示，那最有可能是 `githubusercontent.com` 被本地服务商 DNS 污染，解决方案是加入如下 DNS 解析到你的 hosts 文件中：

```
199.232.96.133 raw.githubusercontent.com
199.232.96.133 camo.githubusercontent.com
```

如果你发现访问 github 很慢，那是因为本地服务商在进行 DNS 网络过滤，加入如下 host 跳过服务商网络过滤：

```
140.82.112.3 github.com
```

如果你的仓库的主分支是 master 而不是 main，请自行修改构建脚本依赖分支为 master，在.github/workflows/ci.yml 中。

## Tricks

- 点击图片可以查看更多细节
- 点击右上角的文件夹图标可以进入文件夹模式
- 在移动端同样是可以使用的

更多功能请自行探索:

- 列表模式
- 搜索
- 导航
- 小型的文件系统

如果你有自己的需求，而且你认为你的需求合理的话，可以通过 issue 或者 discussion 提给我，如果确实有价值，我会实现，当然，你也可以自行实现。

## 配置文件

```json
{
	// 支持的图片格式
	"types": ["svg", "png", "jpg", "jpeg", "gif", "webp"],

	// 开启图片压缩，当compress : false时，关闭压缩
	// 仅支持对jpg、png、gif进行压缩
	"compress": {
		// 图片质量 0.1 - 1
		"quality": 0.8,
		// 如果设定为true，webp，jpg、png将使用imagemin的webp插件进行压缩
		"webp": false
	},

	// 文件夹读取深度
	"depth": 12
}
```

## Accessibility

Picpic 支持所有现代浏览器，建议使用 chrome 或是 firefox 进行访问。

## License

Picpic 使用的是开放的 MIT 协议。 (http://opensource.org/licenses/MIT)
