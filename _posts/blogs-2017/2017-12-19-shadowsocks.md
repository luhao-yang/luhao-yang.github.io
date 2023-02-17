---
id: 34
title: Shadowsocks Proxy
#date: 2017-12-19T00:09:15+00:00
author: Luhao
summary: This is a simple passage about configuring shadowsocks client and building up the corresponding proxy server
layout: post
#guid: http://flywithfan.net/?p=34
#permalink: /misc/34/
categories:
  - Network
---
#### **SS  Client：**

根据不同的平台Shadowsocks客户端分成几个版本，不过都大同小异，最主要的就是把代理服务器的IP地址、端口、密码和加密方式配置好就行了。

可以看看这个网站，从这上面下载客户端    <https://global.ishadowx.net/>

&nbsp;<figure id="attachment_35" style="width: 525px" class="wp-caption aligncenter">

<img class="wp-image-35 size-large" src="http://flywithfan.net/wp-content/uploads/2017/12/WechatIMG3-1-1024x455.jpeg" alt="shadowsocks client versions" width="525" height="233" /><figcaption class="wp-caption-text">shadowsocks各平台客户端</figcaption></figure> 

Mac版本配置界面就长界面，其他版本也差不多

<img class="alignnone size-medium wp-image-36" src="http://flywithfan.net/wp-content/uploads/2017/12/WechatIMG4-1-300x187.jpeg" alt="" width="300" height="187" />

&nbsp;

其实上面这个网站本来就有一些免费的代理信息，但是缺点是速度不是很快，而且每六个小时就会换一次密码，经常用的话要频繁更换密码，很不方便。

#### **SS  Server：**

我推荐购买VPS，自己搭服务端，ss服务端版本有四种，我推荐用Go版本的，一键安装 go 版的 shadowsocks

**获取并一键安装：**

`wget --no-check-certificate https://raw.githubusercontent.com/iMeiji/shadowsocks_install/master/shadowsocks-go.sh<br />
chmod +x shadowsocks-go.sh<br />
./shadowsocks-go.sh 2>&1 | tee shadowsocks-go.log`

**安装完成后，脚本提示如下：**

    Congratulations, shadowsocks-go install completed!
    Your Server IP:your_server_ip
    Your Server Port:your_server_port
    Your Password:your_password
    Your Local Port:1080
    Your Encryption Method:aes-256-cfb
    
    Welcome to visit:http://teddysun.com/392.html
    Enjoy it!
    

* * *

安装完成后即已后台启动 shadowsocks-go ，运行：
  
`/etc/init.d/shadowsocks-go status`
  
可以查看 shadowsocks-go 进程是否已经启动。
  
本脚本安装完成后，已将 shadowsocks-go 加入开机自启动。

**使用命令：**
  
启动：`/etc/init.d/shadowsocks-go start`
  
停止：`/etc/init.d/shadowsocks-go stop`
  
重启：`/etc/init.d/shadowsocks-go restart`
  
状态：`/etc/init.d/shadowsocks-go status`

**卸载方法：**
  
使用 root 用户登录，运行以下命令：
  
`./shadowsocks-go.sh uninstall`

&nbsp;

&nbsp;

原文&参考：

<https://github.com/iMeiji/shadowsocks_install/wiki/shadowsocks-go-%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85>

<https://github.com/shadowsocks/shadowsocks-go>

&nbsp;