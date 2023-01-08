---
id: 208
title: 'WordPress installed themes couldn&#8217;t be found'
#date: 2018-03-22T13:29:57+00:00
author: Luhao
summary: "Wordpress installed themes couldn't be found!  Easy to solve, check here."
layout: post
#guid: http://flywithfan.net/?p=208
#permalink: /misc/208/
categories:
  - Tech
tags:
  - wordpress
---
Today I have installed a few themes of WordPress but I can&#8217;t find them in the admin page, while I can locate them on my server.

It seems that the php can&#8217;t scan the directory of this website. So here is the solution:
  
Plus, I build my website on [lnmp](https://lnmp.org/), so it&#8217;s easy to manage.

  1. find **php.ini**. If you installed php in default dir, that is /usr/local/php/etc/php.ini (or you can check it at yourdomain/phpinfo.php)
  2. vi php.ini, search disable_functions remove **scandir**, save & exit.
  
    ![](/assets/img/uploads/2018/php.png)
  3. restart php service. (I would use **lnmp reload**)

Sadly, I find my Mysql process seems &#8216;dead&#8217; so that I have tried a few times to restart mysql but it didn&#8217;t work. I have to kill it then I succeed.

![](/assets/img/uploads/2018/killmysql.png)
  
![](/assets/img/uploads/2018/killmysql2.png)

Finally, I can see those themes&#8230;

![](/assets/img/uploads/2018/themes_find.png)