---
id: 194
title: Nine ways of cross-origin communication
#date: 2018-02-27T15:04:16+00:00
author: Luhao
summary: "I found an article which comprehensively introduced some tricky ways of communication cross origin, and I think it's very useful so I would translate it to you."
layout: post
#guid: http://flywithfan.net/?p=194
#permalink: /javascript/194/
categories:
  - Frontend
tags:
  - javascript
---
I found an article which comprehensively introduced some tricky ways of communication cross origin, and I think it&#8217;s very useful so I would translate it to you.

If you read chinese, you can visit the source
  
[前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)

* * *

### SOP policy

The same-origin policy restricts how a document or script loaded from one origin can interact with a resource from another origin. It is a critical security mechanism for isolating potentially malicious documents.

it limits these actions below:

  1. Cookie, LocalStorage, IndexDB are inaccessible</p> 
  2. DOM, Js Object can not be acquired

  3. Ajax is limited

Exceptions: Here are some examples of resources which may be embedded cross-origin.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">- JavaScript with &lt;script src="..."&gt;&lt;/script&gt;.

- CSS with &lt;link rel="stylesheet" href="..."&gt;

- Images with &lt;img&gt;

- Media files with &lt;video&gt; and &lt;audio&gt;

- Plug-ins with &lt;object&gt;, &lt;embed&gt; and &lt;applet&gt;

- Fonts with @font-face

- Anything with &lt;frame&gt; and &lt;iframe&gt;. A site can use the X-Frame-Options header to prevent this form of cross-origin interaction.

</code></pre>

## What counts cross origin

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">&lt;br />URL                                      说明                    是否允许通信
http://www.domain.com/a.js
http://www.domain.com/b.js         same domain, different files           allow
http://www.domain.com/lab/c.js

http://www.domain.com:8000/a.js
http://www.domain.com/b.js         same domain, different port               not allowed

http://www.domain.com/a.js
https://www.domain.com/b.js        same domain, different protocol           not allowed

http://www.domain.com/a.js
http://192.168.4.12/b.js           domain referring to ip                    not allowed

http://www.domain.com/a.js
http://x.domain.com/b.js           same main domain, different sub domain                not allowed
http://domain.com/c.js

http://www.domain1.com/a.js
http://www.domain2.com/b.js        different domain                        not allowed

</code></pre>

## Cross origin solutions

  1. jsonp
  2. document.domain + iframe
  3. location.hash + iframe
  4. window.name + iframe
  5. postMessage
  6. CORS
  7. nginx reverse proxy
  8. nodejs middleware
  9. WebSocket

### 1. JSONP

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">&lt;br />//js
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);

    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }

//jquery
$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "onBack",    // 自定义回调函数名
    data: {}
});

//vue.js
this.$http.jsonp('http://www.domain2.com:8080/login', {
    params: {},
    jsonp: 'onBack'
}).then((res) =&gt; {
    console.log(res); 
})

</code></pre>

server respond:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">onBack({"status": true, "user": "admin"})
</code></pre>

node.js implemention:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var querystring = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(fn + '(' + JSON.stringify(params) + ')');

    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');

</code></pre>

disadvantages: jsonp can only apply to the http get method

### 2. document.domain + iframe

attention: this solution is only suitable for &#8216;same main domain, different sub domain&#8217; situation

principle: using js set document.domain being the same value

  1. parent window: (http://www.domain.com/a.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;iframe id="iframe" src="http://child.domain.com/b.html"&gt;&lt;/iframe&gt;
&lt;script&gt;
    document.domain = 'domain.com';
    var user = 'admin';
&lt;/script&gt;
</code></pre>

  1. sub window: (http://child.domain.com/b.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;script&gt;
    document.domain = 'domain.com';
    // 获取父窗口中变量
    alert('get js data from parent ---&gt; ' + window.parent.user);
&lt;/script&gt;
</code></pre>

### 3. location.hash + iframe

principle: a communicates with b by using c as a middleman. same domains using js to communicate, while different domains using location.hash to send value

a.html：(http://www.domain1.com/a.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"&gt;&lt;/iframe&gt;
&lt;script&gt;
    var iframe = document.getElementById('iframe');

    // 向b.html传hash值
    setTimeout(function() {
        iframe.src = iframe.src + '#user=admin';
    }, 1000);

    // 开放给同域c.html的回调方法
    function onCallback(res) {
        alert('data from c.html ---&gt; ' + res);
    }
&lt;/script&gt;
</code></pre>

b.html：(http://www.domain2.com/b.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;iframe id="iframe" src="http://www.domain1.com/c.html" style="display:none;"&gt;&lt;/iframe&gt;
&lt;script&gt;
    var iframe = document.getElementById('iframe');

    // 监听a.html传来的hash值，再传给c.html
    window.onhashchange = function () {
        iframe.src = iframe.src + location.hash;
    };
&lt;/script&gt;
</code></pre>

c.html：(http://www.domain1.com/c.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;script&gt;
    // 监听b.html传来的hash值
    window.onhashchange = function () {
        // 再通过操作同域a.html的js回调，将结果传回
        window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
    };
&lt;/script&gt;
</code></pre>

### 4. window.name + iframe

what the special feature of window.name is, the name attribute can be accessible between different domains in pages, and can store data maximum to 2MB.

a.html：(http://www.domain1.com/a.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">var proxy = function(url, callback) {
    var state = 0;
    var iframe = document.createElement('iframe');

    // 加载跨域页面
    iframe.src = url;

    // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
    iframe.onload = function() {
        if (state === 1) {
            // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
            callback(iframe.contentWindow.name);
            destoryFrame();

        } else if (state === 0) {
            // 第1次onload(跨域页)成功后，切换到同域代理页面
            iframe.contentWindow.location = 'http://www.domain1.com/proxy.html';
            state = 1;
        }
    };

    document.body.appendChild(iframe);

    // 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
    function destoryFrame() {
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();
        document.body.removeChild(iframe);
    }
};

// 请求跨域b页面数据
proxy('http://www.domain2.com/b.html', function(data){
    alert(data);
});
</code></pre>

proxy.html：http://www.domain1.com/proxy&#8230;.

(this page could be empty, just play an role as middle man)

b.html：(http://www.domain2.com/b.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;script&gt;
    window.name = 'This is domain2 data!';
&lt;/script&gt;
</code></pre>

note: via switching the src attribute of iframe to same domain, data stored in window.name can be reachable outside.

### 5. postMessage

> The window.postMessage() method safely enables cross-origin communication between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it. 

more details about postMessage, see [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

a.html：(http://www.domain1.com/a.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"&gt;&lt;/iframe&gt;
&lt;script&gt;       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向domain2传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com');
    };

    // 接受domain2返回数据
    window.addEventListener('message', function(e) {
        alert('data from domain2 ---&gt; ' + e.data);
    }, false);
&lt;/script&gt;
</code></pre>

b.html：(http://www.domain2.com/b.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;script&gt;
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from domain1 ---&gt; ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
        }
    }, false);
&lt;/script&gt;

</code></pre>

### 6. CROS ( Cross-Origin Resource Sharing )

key: set HTTP head Access-Control-Allow-Origin on server

if you want to involve cookie, read relating page on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

client:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容

// 前端设置是否带cookie
xhr.withCredentials = true;

xhr.open('post', 'http://www.domain2.com:8080/login', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('user=admin');

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
};

//jquery
$.ajax({
    ...
   xhrFields: {
       withCredentials: true    // 前端设置是否带cookie
   },
   crossDomain: true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
    ...
});

//vue

Vue.http.options.credentials = true

</code></pre>

server:

java:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">/*
 * 导入包：import javax.servlet.http.HttpServletResponse;
 * 接口参数中定义：HttpServletResponse response
 */
response.setHeader("Access-Control-Allow-Origin", "http://www.domain1.com");  // 若有端口需写全（协议+域名+端口）
response.setHeader("Access-Control-Allow-Credentials", "true");
</code></pre>

nodejs:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var postData = '';

    // 数据块接收中
    req.addListener('data', function(chunk) {
        postData += chunk;
    });

    // 数据接收完毕
    req.addListener('end', function() {
        postData = qs.parse(postData);

        // 跨域后台设置
        res.writeHead(200, {
            'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
            'Access-Control-Allow-Origin': 'http://www.domain1.com',    // 允许访问的域（协议+域名+端口）
            'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'   // HttpOnly:脚本无法读取cookie
        });

        res.write(JSON.stringify(postData));
        res.end();
    });
});

server.listen('8080');
console.log('Server is running at port 8080...');
</code></pre>

### 7. Nginx

  1. nginx configurations on iconfont

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">location / {
  add_header Access-Control-Allow-Origin *;
}
</code></pre>

  1. nginx reverse proxy

note: SOP is the policy of browser, not HTTP.

principle: run a nginx server which forwards http requests. The key is the domain of this server must have the same domain with original server. In addition, we can modify the domian information of cookie, to make cross origin communication work.

nginx conf:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
</code></pre>

client:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问nginx中的代理服务器
xhr.open('get', 'http://www.domain1.com:81/?user=admin', true);
xhr.send();
</code></pre>

nodejs server:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));

    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'   // HttpOnly:脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
</code></pre>

### 8. Node.js middleware

note: this solution works like nginx, forwarding requests via proxy server. With cookieDomainRewrite, we can modify cookie&#8217;s domain.

env: node + express + http-proxy-middleware

client:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问http-proxy-middleware代理服务器
xhr.open('get', 'http://www.domain1.com:3000/login?user=admin', true);
xhr.send();
</code></pre>

nodejs middleware:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/', proxy({
    // 代理跨域目标接口
    target: 'http://www.domain2.com:8080',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
}));

app.listen(3000);
console.log('Proxy server is listen at port 3000...');
</code></pre>

target server: like the one in the CROS example

### 9. WebSocket

WebSockets are an advanced technology that makes it possible to open an interactive communication session between the user&#8217;s browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.

[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

you can use Socket.io instead of raw APIs of browser

client:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javscript">&lt;div&gt;user input：&lt;input type="text"&gt;&lt;/div&gt;
&lt;script src="./socket.io.js"&gt;&lt;/script&gt;
&lt;script&gt;
var socket = io('http://www.domain2.com:8080');

// 连接成功处理
socket.on('connect', function() {
    // 监听服务端消息
    socket.on('message', function(msg) {
        console.log('data from server: ---&gt; ' + msg); 
    });

    // 监听服务端关闭
    socket.on('disconnect', function() { 
        console.log('Server socket has closed.'); 
    });
});

document.getElementsByTagName('input')[0].onblur = function() {
    socket.send(this.value);
};
&lt;/script&gt;
</code></pre>

server:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var http = require('http');
var socket = require('socket.io');

// 启http服务
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');

// 监听socket连接
socket.listen(server).on('connection', function(client) {
    // 接收信息
    client.on('message', function(msg) {
        client.send('hello：' + msg);
        console.log('data from client: ---&gt; ' + msg);
    });

    // 断开处理
    client.on('disconnect', function() {
        console.log('Client socket has closed.'); 
    });
});
</code></pre>