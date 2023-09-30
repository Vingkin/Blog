#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
vuepress build src

# 进入生成的文件夹
cd src/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://vingkin.github.io/Blog
git push -f git@github.com:vingkin/Blog.git master:blog-pages

cd -
git init
git add -A
git commit -m 'update'
git pull origin main
git push origin main

cd -