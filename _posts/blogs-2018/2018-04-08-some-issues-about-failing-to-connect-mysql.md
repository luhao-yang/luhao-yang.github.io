---
id: 268
title: Some issues about failing to connect mysql
#date: 2018-04-08T18:29:29+00:00
author: Luhao
layout: post
#guid: http://flywithfan.net/?p=268
#permalink: /misc/268/
categories:
  - General
tags:
  - mysql
---
Today when I tried to use mysql, I encountered this problem first:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-sh">ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)
</code></pre>

I can&#8217;t find the **mysql.sock** file in my mac, it seems starting mysql service would create one, so input `mysql.server start`

but I got this output:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-sh">Starting MySQL
... ERROR! The server quit without updating PID file (/usr/local/var/mysql/xxxx.pid).
</code></pre>

I attempted to update or reinstall mysql via Homebrew, but it didn&#8217;t work either.
  
And I tried many methods from others&#8217; experience, yet still not working well.

Practice proves that the best way is to check the log yourself, analyzing your own specific problem.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-sh">cd /usr/local/var/mysql/
view xxxx.err
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-sh">2018-04-08T08:54:06.495097Z 0 [ERROR] Fatal error: Can't open and lock privilege tables: Table 'mysql.user' doesn't exist
2018-04-08T08:54:06.495370Z 0 [ERROR] Aborting
</code></pre>

Oh, maybe it&#8217;s need to initialize with `mysqld --initialize`, but it shows I already have this directory, so I have to delete it(better to make backup).

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-sh">2018-04-08T09:56:51.978123Z 0 [ERROR] --initialize specified but the data directory has files in it. Aborting.
2018-04-08T09:56:51.978186Z 0 [ERROR] Aborting
</code></pre>

Then initializing sucess, please remeber the password

![](/assets/img/uploads/2018/1.png)

To have launchd start mysql now and restart at login:
   
`brew services start mysql`
  
Or, if you don&#8217;t want/need a background service you can just run:
   
`mysql.server start`

Finally, after starting the mysql service, I was able to connect as root, thank god&#8230;

`mysql -uroot -pyourpassword`