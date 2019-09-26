# Linux用户管理

<a name="WW8m0"></a>
# 用户基本概述
Linux系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。<br />用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。<br />每个用户账号都拥有一个唯一的用户名和各自的口令。<br />用户在登录时键入正确的用户名和口令后，就能够进入系统和自己的主目录。<br />实现用户账号的管理，要完成的工作主要有如下几个方面：

- 用户账号的添加、删除与修改。
- 用户口令的管理。
- 用户组的管理。
<a name="qQ9Fi"></a>
# 查询用户信息
```bash
id        显示用户信息 uid gid 和属于用户组
w         显示谁登陆系统 并 在干什么
last      所有用户的每次的登录情况 
lastlog   所有用户最近一次的登录情况
```

<a name="gfufa"></a>
# Linux用户管理
<a name="3fbOb"></a>
## 用户分类
**1、管理员用户**<br />默认是root用户，它的UID 和GID均为0，系统安装完成后自动生成的，默认通过它就可以登录系统，拥有最高的管理权限。<br />**2、普通用户**<br />由系统管理员root创建的，创建完成后可以登录系统，但默认无法创建、修改和删除任何管理员下的文件；UID从500-65535<br />**3、系统用户（或虚拟用户）**<br />安装系统后默认生成的用户，大多数不能登录系统，但它们是系统正常运行不可缺少的，它们的存在主要是为了方便系统管理，满足相应的系统进程对文件所属用户的要求；UID从 1-499 

<a name="azaZP"></a>
## 创建用户
`useradd`<br />语法:
```bash
useradd  [options] [login] 
useradd  [选项] [用户名]
```
选项:

- -u  指定uid,这个值是唯一的
- -s  shell 命令解释器 （默认是/bin/bash）

                   虚拟用户命令解释器:  /sbin/nologin      

- -c 创建用户时，添加个人信息
- -M  不创建家目录  （sM)
- -g  指定用户组名称
- -d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录
- -G 用户组，用户组 指定用户所属的附加组

实例:
```bash
useradd -u 999  -s /sbin/nologin -M lidao999
```
此命令添加一个用户lidao999 uid为999 禁止 登录系统不创建家目录

<a name="KOvug"></a>
## 删除用户
`userdel`<br />删除用户，但不会删除用户家目录<br />语法:
```bash
userdel [options] [login]
userdel [选项] [用户名]
```
选项:

- -r    删除用户的同时，删除与用户相关的所有文件(包含邮箱信息)
- -f    强制删除用户

注意：一般不要删除，可以通过注释/etc/passwd

<a name="GBBlX"></a>
## 修改密码
`passwd`<br />语法:
```bash
passwd [option] [username]
passwd [选项] [用户名]
```
选项

- --stdin  非交互式设置密码  

实例1: 
```bash
passwd           #命令
Changing password for user root.  修改root用户的密码,当前用户是root
New password:    #输入新密码
Retype new password:        #重新输入新密码
passwd: all authentication tokens updated successfully.
注：普通用户使用passwd 修改密码时，必须满足密码复杂性要求；root 修改密码不需要满足密码复杂性。
```
此命令修改当前用户的密码

实例2: 
```bash
passwd alan   #修改alan用户的密码
Changing password for user alan.
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.  #修改成功
```
此命令修改普通用户的密码

实例3: 
```bash
echo "123456" |passwd --stdin alan   #给alan用户设置密码为123456
Changing password for user a1.
passwd: all authentication tokens updated successfully.
```
此命令非交互式设置密码

<a name="4SRPN"></a>
## 修改用户信息
`usermod`<br />语法:
```bash
usermod [options] [login]
usermod [选项] [用户名]
```
选项:

- -c 修改用户的个人信息，同useradd 的-c功能  
- -g 修改用户对应的用户组，同 useradd的-d功能
- -s 修改用户登录后使用的shell名称，同useradd的-s功能
- -u 修改用户的uid ，同useradd 的-u功能
- -l 修改用户的名称

常用的选项包括`-c, -d, -m, -g, -G, -s, -u以及-o等`，这些选项的意义与`useradd`命令中的选项一样，可以为用户指定新的资源值。

<a name="ryP5a"></a>
# Linux系统用户组的管理
每个用户都有一个用户组，系统可以对一个用户组中的所有用户进行集中管理。不同Linux 系统对用户组的规定有所不同，如Linux下的用户属于与它同名的用户组，这个用户组在创建用户时同时创建。<br />用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改实际上就是对/etc/group文件的更新。

<a name="pKjaa"></a>
## 用户组的特点
Linux系统中的用户组（group）就是具有相同特征的用户的集合；<br />有时我们需要让多个用户具有相同的权限，就要创建组；<br />将用户分组是Linux系统中对用户进行管理及控制访问权限的一种手段；<br />一个用户可以加入到多个组。

<a name="GQJ4f"></a>
## 增加用户组
`groupadd` <br />语法：
```bash
groupadd [options] [group]      
groupadd [选项] [用户组]
```
选项:

- -g GID 指定新用户组的组标识号（GID）。
- -o 一般与-g选项同时使用，表示新用户组的GID可以与系统已有用户组的GID相同。

实例：
```bash
groupadd group1
```
此命令向系统中增加了一个新组group1，新组的组标识号是在当前已有的最大组标识号的基础上加1。

<a name="f1EW1"></a>
## 删除已有用户组
`groupdel` <br />语法:
```bash
groupadd  [group]      
groupadd  [用户组]
```
例如：
```bash
groupdel group1
```
此命令从系统中删除组group1。

<a name="0IS9y"></a>
## 修改用户组的属性
`groupmod` <br />语法:
```bash
groupmod [options] [group]      
groupmod [选项] [用户组]
```
选项:

- -g GID 为用户组指定新的组标识号。
- -o 与-g选项同时使用，用户组的新GID可以与系统已有用户组的GID相同。
- -n新用户组 将用户组的名字改为新名字

实例1：
```bash
groupmod -g 102 group2
```
此命令将组group2的组标识号修改为102。

实例2：
```bash
groupmod –g 10000 -n group3 group2
```
此命令将组group2的标识号改为10000，组名修改为group3。

<a name="oT0GQ"></a>
# 用户及组配置文件

```bash
ll /etc/passwd /etc/group /etc/shadow /etc/gshadow 
-rw-r--r-- 1 root root 1180 Aug 13 10:14 /etc/passwd     存放用户信息 
-rw-r--r-- 1 root root  614 Aug 13 10:16 /etc/group      用户组信息   每个用户组里面有什么用户？ 
---------- 1 root root  873 Aug 13 10:49 /etc/shadow     用户密码信息 
---------- 1 root root  501 Aug 13 10:16 /etc/gshadow    用户组密码信息
```


