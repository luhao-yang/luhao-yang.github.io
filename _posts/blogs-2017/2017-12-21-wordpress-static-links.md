---
id: 64
title: WordPress static links based on Nginx
#date: 2017-12-21T17:13:43+00:00
author: Luhao
summary: Get rid of default links of Wordpress, replace them with elegant and reader-friendly linking formats, based on Nginx.
layout: post
#guid: http://flywithfan.net/?p=64
#permalink: /architecture/64/
categories:
  - Misc
tags:
  - wordpress
---
### Why would we change the format of links?

wordpress&#8217;s default linking style is dynamic form, like:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">xxx/?pageid=8
</code></pre>

into

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">xxx/pageid/8
</code></pre>

Doing this is reader-friendly, and makes url look more elegent, but most important is helping **search engine** to understand so that your archives could be easily collected.

No more garbage, let&#8217;s do it!

* * *

  1. go into wp setting->permalinks, change it into /%category%/%post_id%/ like this:
  
    ![](/assets/img/uploads/2017/3D167A44-2EB9-4A59-A9DE-4067A6C1CE8F-1024x485.jpg)
  
    **_PS: after that, your archives would render 404 to users immediately, don&#8217;t worry_**</p> 
  2. modify nginx config
  
    In case someone doesn&#8217;t know where the config file is, input nginx -t</p> 

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-shell">root@me:/usr/local/nginx/conf# nginx -t
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
</code></pre>

open nginx.conf, add these below:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">location / {  
       index index.html index.php;  
       if (-f $request_filename/index.html){  
           rewrite (.*) $1/index.html break;  
       }  
       if (-f $request_filename/index.php){  
           rewrite (.*) $1/index.php;  
       }  
       if (!-f $request_filename){  
           rewrite (.*) /index.php;  
       }  
   }  
</code></pre>

  1. restart nginx, enjoy it!

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-shell">nginx -s reload
</code></pre>

about more config of nginx, visit here:
  
[nginx#location](http://wiki.nginx.org/NginxHttpCoreModule#location)