---
layout: post
title: ES6中var、let、const
date: 2019-09-23 20:00:00 +0300
description: You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)
img: es6变量声明.jpg # Add image post (optional)
tags: [ES6, var, let, const] # add tag
---

>ECMAScript 6（简称ES6）是于2015年6月正式发布的JavaScript语言的标准，正式名为ECMAScript 2015（ES2015）。它的目标是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。另外，一些情况下ES6也泛指ES2015及之后的新增特性，虽然之后的版本应当称为ES7、ES8等。


## 一. var
1. var分为全局作用域（GO）和函数作用域（AO）
2. var有预解析，变量声明提升，函数整体提升 （在执行代码前会先进行预解析var）
	* 变量声明提升：首先预解析，然后在当前执行期上下文内 声明变量并赋值 Undefined
	* 函数整体提升：首先预解析，然后在当前执行期上下文内 声明函数并赋值 函数体
2. if、for属于全局作用域（外部可以访问变量）

## 二. let

1. 块级作用域 { }   （独立作用域，没有var闭包的问题）
2. 没有预解析，不存在变量提升（先定义，后使用 否则is no defined）
3. 同一个作用域内，不能重复定义变量
4. for循环 ()和{}作用域不同  ()是父级作用域  相当于({})

## 三. const

1. 特性和let一样
2. const定义变量必须有值，必须定义时赋值不能后赋值，定义时不赋值会报错
3. const定义的变量不能修改
4. const定义的数组/对象，可以通过相应的引用更改值，不能直接修改（例：arry.push(11)）
5. const用Object.freeze(对象)生成的对象不可以通过引用修改和直接修改


