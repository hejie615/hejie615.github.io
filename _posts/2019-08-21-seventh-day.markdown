---
layout: post
title: Seventh day
date: 2019-08-21 19:00:00 +0300
description: You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)
img: 7.jpg # Add image post (optional)
tags: [日报, git远程操作] # add tag
---

>Git中的大多数操作只需要本地文件和资源来运行 - 通常不需要来自网络上另一台计算机的信息。如果你已经习惯了大多数操作都有网络延迟开销的CVCS，那么Git的这个方面会让你觉得速度之神已经赐予Git不可思议的力量。因为您在本地磁盘上拥有项目的完整历史记录，所以大多数操作几乎都是即时的。

例如，要浏览项目的历史记录，Git不需要去服务器获取历史记录并为您显示它 - 它只是直接从本地数据库中读取它。这意味着您几乎可以立即看到项目历史记录。如果你想看到当前版本的文件和一个月前的文件之间引入的变化，Git可以在一个月前查找文件并进行本地差异计算，而不必要求远程服务器执行此操作或从远程服务器中提取旧版本的文件以在本地执行此操作。

## 第七天学习日报

* git初学----100%

## 第七天学习总结

* 终于学完git常用命令
* git常用远程操作
	1. 查看远程版本库信息（所有版本库和地址信息）注：remote就是版本库名
	git remote -v
	2. 查看指定远程版本库信息（详细信息）
	git remote show <remote>
	3. 添加远程版本库
	git remote add <remote> <url>
	4. 从版本库更新到本地，不会自动合并
	git fetch <remote> [分支]
	5. 从远程版本库更新到本地，会自动合并(不填写远程分支，默认跟踪同名的远程分支，若没有则自动生成)
	git pull <remote> <branch>:<远程分支>
	6. 推送到远程版本库，会自动合并(不填写远程分支，默认跟踪同名的远程分支，若没有则自动生成)
	git push <remote> <branch>:<远程分支>
	7. 删除远程分支或标签
	git push <remote> :<branch/tag-name>
	8. 上传标签
	git push <remote> <tag-name>
