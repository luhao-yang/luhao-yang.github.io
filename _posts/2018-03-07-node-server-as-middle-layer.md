---
id: 198
title: Node Server as middle layer
#date: 2018-03-07T18:24:05+00:00
author: Luhao
summary: "Many big technology companies place Node.js web servers in front of real API's backend at the moment, Why?"
layout: post
#guid: http://flywithfan.net/?p=198
#permalink: /architecture/198/
categories:
  - Web
---
Many big technology companies place Node.js web servers in front of real API&#8217;s backend at the moment, Why?

![](https://segmentfault.com/img/bVI1km?w=590&h=611/view)

There are a few reasons:

  1. Performance 
    Node.js is famous for non-blocking I/O and high concurrency, so it&#8217;s very suitable for purposes like forwarding or load-balance. These functionalities look very much like nginx.

  2. Reuse
    
    There are many different clients these days, including desktop, mobile web, phone apps, tablet apps, Android, iOS, Windows Phone, etc. If the clients called all the data backends directly, we&#8217;d have to implement the same assembly graph in each one. Instead, each client calls the same set of node.js endpoints and gets (more or less) the same JSON payload back.

  3. Security
    
    the node.js service can be a central place to check authentication, CSRF, and business logic (ie, is the user allowed to see/modify certain types of data). You obviously can&#8217;t trust the client to do these checks.

  4. Data decoration
    
    data backends typically serve up raw data that may need to be decorated for presentation. For example, i18n, number/date/currency formatting, and URLs can all be handled at the node.js layer and should not be in the data backend layer.

  5. Proxy
    
    This is a way to get around the Same Origin Policy of browsers. What&#8217;s more, we can put static resources on the server, which leads to that, if the request is referring to a static resource, node server could respond immediately; if it is a dynamic request, the server would forward it to the backend which has published serviece APIs.
    
    In addition, we can make data cache on the server. see [**more**](https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0).

  6. SSR
    
    Server Side Rendering is drawing more and more attention from developers because people nowadays are making Single Page Application, but it has two obvious problems, one is homepage rendering speed, the other is seo(Search Engine Optimization).
    
    When web app is growing bigger and bigger, the first page normally is constituted of many contents and will launch massive requesting, so it sometimes would render very slow especially the network is bad. Thus, in some cases, people would go back to the &#8216;old&#8217; way of rendering contents from server side&#8230;
    
    For the SEO, there is a project named [prerender.io](https://prerender.io/)
    
    > Search engines and social networks are always trying to crawl your pages, but they only see the javascript tags&#8230;
    
    > We render your javascript in a browser, save the static HTML, and you return that to the crawlers! 
    
    It is said that google has done very well in crwaling SPA. It can execute JS in a browser environment. BTW, it&#8217; better to ensure using HTML5 history mode in your URL scheme [SPA and SEO: Google (Googlebot) properly renders Single Page Application and execute Ajax calls](https://medium.com/@l.mugnaini/spa-and-seo-is-googlebot-able-to-render-a-single-page-application-1f74e706ab11)

LINKS:

[node做中间层的作用和好处？](https://segmentfault.com/q/1010000008307476)

[Why do some backend architectures place Node.js web servers in front of another API&#8217;s backend?](https://www.quora.com/Why-do-some-backend-architectures-place-Node-js-web-servers-in-front-of-another-APIs-backend)