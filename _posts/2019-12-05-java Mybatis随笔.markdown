---
layout: post
title: JavaMybatis随笔
date: 2019-12-05 09:00:00 +0300
description: You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)
img: JavaMybaits.jpg # Add image post (optional)
tags: [随笔] # add tag
---

### Mybatis 的作用 

```
可以用来执行普通的sql操作   存储过程    
它是一个高级的ORM(Object Relation  Mapping  对象关系映射  以面向对象的思想操作数据库)框架
它封装了几乎所有的jdbc 操作    以及参数的手工设置  
结果集检索(把结果集自动转换成对象)  
```
#### Mybatis 框架的构成 

```
实体类             封住数据和业务逻辑 
SQL定义文件        写SQL语句的XML 文件 
主配置文件         用来定义连接数据库信息 和 加载SQL定义文件 以及做一些特殊设置的 XML文件 
框架的API          主要通过SqlSession 来体现   (SqlSession 略微麻烦一些)  用来
                    完成增删改查 
```

##### 使用Mybatis 完成根据id 查询银行账户

``` 
1. 建立一个项目 导入jar包(mybatis.jar 数据库驱动)
2. 根据表建立对应的实体类 
3. 拷贝sql 定义文件的模板 到 一个包中     在sql 定义文件中 定义SQL语句
4. 拷贝主配置文件模板 到src下     定义连接数据的信息  并加载sql定义文件 
5. 获取SqlSession对象   使用SqlSession 完成查询
```

#### MyBatis 的Mapper 映射器规则

```   
--- 如果按照规则编写DAO 接口则不用写DAO的实现类 因为可以自动生成
a.接口中的方法名   和  Sql定义文件中的  sql语句的id 保持一致 
b.接口中方法的返回值类型  和  sql语句中的  resultType 保持一致 
   当是查询语句时 如果是返回单值  则 和   resultType 保持一致  如果可能返回多个值 
     则使用List<这里的类型和restultType保持一致>
   如果是增删改 语句  则返回void 或者int  推荐使用 int
c.接口中方法的参数和 parameterType 保持一致 
    如果没有  parameterType 则代表方法参数任意 
d.SQL 定义文件中的 namespace  要写 包名.接口名   
``` 

##### 当数据库的字段和实体类中的成员变量 不一致时 应该如何处理       当然set方法也要对应

```
a.使用sql 语句中别名 
b.使用resultMap 来解决 
```

#### mybatis 中的多参处理   --- 以账号 和密码为查询条件 查询账户 

```
#{0}  #{1}
#{param1}  #{param2}
@Param("参数名")   
```  

#### 按照acc_money 排序 显示所有的银行账户数据 
 
``` 
分页插件的使用  
1. 导入分页插件的jar包
2. 在主配置文件中配置 分页插件的拦截器 
3. 在查询前 调用PageHelper 的API 设置分页信息   
```

#### Spring  和  Mybatis的整合

``` 
1. 新建一个项目  导入jar包(ioc aop  mybatis  mybatis-spring 
     dao  数据库驱动 连接池)拷贝 Spring 容器的配置文件到src下
2. 根据银行账户表  建立一个实体类 
3. 编写SQL 定义文件   根据 id  查询 银行账户  
4. 根据Mapper 映射器规则 编写DAO 接口 
5. 在Spring 容器中  创建 SqlSessionFactoryBean  返回SqlSessionFactory
     依赖于  dataSource   和  Sql 定义文件 
6. 在Spring 容器创建  MapperFactoryBean   返回 DAO 的实现类
     依赖于  接口 和 SqlSessionFactory 
7. 创建Spring容器 从容器中 获取DAO 的实现类  测试 
```       

#### Mybatis  和  Spring 的第二种手段

``` 
   ----  利用模板(SqlSessionTemplate) 自己写DAO的实现类 
1. 新建一个项目  导入jar包(ioc aop  mybatis  mybatis-spring 
     dao  数据库驱动 连接池)拷贝 Spring 容器的配置文件到src下
2. 根据银行账户表  建立一个实体类 
3. 编写SQL 定义文件   根据 id  查询 银行账户  
4. 根据Mapper 映射器规则 编写DAO 接口 
5. 在Spring 容器中  创建 SqlSessionFactoryBean  返回SqlSessionFactory
     依赖于  dataSource   和  Sql 定义文件 
6. 自己写DAO 的实现类 注入 SqlSessionTemplate对象  这个对象依赖于  SqlSessionFactory
7. 开启组件扫描 在容器中创建DAO的实现类对应的对象  获取这个对象测试
```

##### 以登录为例   完成 SSM 架构的搭建

``` 
1. 将Mybatis 和  Spring 进行整合 (以MapperScannerConfigurer 最终提供Service)
    a.建立一个项目  导入jar包(ioc aop dao mvc mybatis mybatis-spring
        数据库连接池  数据库驱动 )  拷贝spring 配置文件到src下  
    b.根据表 建立实体类 
    c.编写SQL 定义文件   根据账号 和 密码进行查询 
    d.编写DAO 接口 
    e.在Spring 容器中 创建 SqlSessionFactoryBean  提供  SqlSessionFactory
        依赖dataSource  和 Sql定义文件 
    f.创建 MapperScannerConfigurer  批量产生DAO 实现类  依赖于basePackage
        和   SqlSessionFactory
    g.编写Service 类 提供业务方法 根据账号和密码进行 登录    然后开启组件扫描
        在容器中创建 Service 对应的对象  测试 
2. 搭建基于标注的Spring MVC
  
3. 编写控制器方法  让页面请求 结合到控制器方法  
    控制器方法中使用  Service 完成 登录  根据结果 做页面跳转 
```  
  
  
  













    
  
 












 
 
 
 
 
 
             