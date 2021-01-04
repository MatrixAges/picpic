<p align="center"><a href="#" target="_blank" rel="noopener noreferrer"><img width="200" src="https://matrixage.github.io/img/projects/picpic/logo_picpic_black.png" alt="picpic logo"></a></p>

# <p align="center"> picpic </p>

_<p align="center">An awesome image host service driven by github pages and github actions.</p>_

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/join-welcome-brightgreen.svg" alt="attitude_img"></a>
  <a href="#"><img src="https://img.shields.io/badge/version-1.0-orange.svg" alt="version_img"></a>
  <a href="#"><img src="https://img.shields.io/badge/compres%20size-7k-red.svg" alt="size_img"></a>
  <a href="#"><img src="https://img.shields.io/badge/style-light%20design-yellow.svg" alt="style_img"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

## Doc

[EN](https://github.com/MatrixAges/picpic#readme) | [中文文档](https://github.com/MatrixAges/picpic/blob/master/readme_cn.md)

## Installation

Install via npm:

```bash
$ npm i @matrixage/picpic
```

## Usage

To use picpic, by below steps:

- mkdir a folder & cd it
- `npm init` & press enter through
- `npm i @matrixage/picpic`
- `"init": "picpic init"` into package.json `scripts`
- `npm run init`
- drop you images to `assets` folder
- `git commit` & `git push` to you github

then active your gh-pages:

![gh-pages](https://matrixage.github.io/img/projects/picpic/choose_gh_pages.jpg)

if your acccout do not active github actions, you should active github actions and git push again to trigger delopy process.

if your github repo first branch is master,please change the branch in .github/workflows/ci.yml (main => master)

## Preview

![picpic_example](https://matrixage.github.io/img/projects/picpic/picpic_example.jpg)

## Tricks

click image to preview detail:
![preview_detail](https://matrixage.github.io/img/projects/picpic/preview_detail.jpg)

click top-right icon folder to preview images in mode[folder]:
![picpic_ex_folder](https://matrixage.github.io/img/projects/picpic/picpic_ex_folder.jpg)

mobile is avaible when you visit site use mobile:
![preview_mobile](https://matrixage.github.io/img/projects/picpic/preview_mobile.jpg)

also, more you can explore:
- list mode
- search
- navigator
- minim file system

if you have more demands, and if you think your demands reasonal, you can talk to me.

## Dev route

- support picpic.config.json
- support imagemin

## Accessibility

Picpic supports the all modern browsers,and you can preview picpic images in chrome or firefox.

## License

Picpic is licensed under the MIT license. (http://opensource.org/licenses/MIT)
