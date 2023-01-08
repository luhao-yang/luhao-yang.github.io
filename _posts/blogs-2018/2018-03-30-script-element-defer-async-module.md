---
id: 265
title: 'script element &#8211; defer, async, module'
#date: 2018-03-30T11:12:11+00:00
author: Luhao
summary: just go over these basic knowledge
layout: post
#guid: http://flywithfan.net/?p=265
#permalink: /javascript/265/
categories:
  - Web
tags:
  - frontend
---
The HTML `<script>` element is used to embed or reference executable code; this is typically used to embed or refer to JavaScript code.

Normal script, without async or defer attribute

![](http://www.growingwiththeweb.com/images/2014/02/26/legend.svg)

![](http://www.growingwiththeweb.com/images/2014/02/26/script.svg)

## async

indicating that the browser should, if possible, execute the script asynchronously.

![](http://www.growingwiththeweb.com/images/2014/02/26/script-async.svg)

## defer

the script is meant to be executed after the document has been parsed, but before firing DOMContentLoaded.
  
Scripts with the defer attribute will execute **in the order** in which they appear in the document.

![](http://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg)

## How to use

  * If the script is modular and does not rely on any scripts then use async.
  * If the script relies upon or is relied upon by another script then use defer.
  * If the script is small and is relied upon by an async script then use an inline script with no attributes placed above the async scripts.

## module

`<script type="module" ...></script>`is treated as a JavaScript module.

That means we are using ES6 module syntax, **import** and **export**. Since there are still many browser&#8217;s version that have not been compatible with this feature, we usually utilize babel to transform those parts to ES5 syntax.

* * *

  1. [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
  2. [async-vs-defer](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)