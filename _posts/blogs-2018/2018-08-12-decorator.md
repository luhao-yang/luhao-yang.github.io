---
id: 381
title: Decorator
#date: 2018-08-12T11:04:05+00:00
author: Luhao
layout: post
#guid: http://flywithfan.net/?p=381
#permalink: /javascript/381/
categories:
  - Frontend
tags:
  - javascript
---
Decorator is the new feature of ES7! Well, it isn&#8217;t really a standard feature now. It&#8217;s in Stage 2, but, thanks to babel, we can use it immidiately.

Let&#8217;s see a very simple example:

<pre><code class="language-javascript ">@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
</code></pre>

Its purpose seems like what the Decorator Pattern does, right?

> A decorator is the name used for a software design pattern. Decorators dynamically alter the functionality of a function, method, or class without having to directly use subclasses or change the source code of the function being decorated. 

Decorator signature:
  
`function(target, property, descriptor){}`

decorating method of class

<pre><code class="language-javascript ">class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
</code></pre>

**But we can not decorate function like this!**

<pre><code class="language-javascript ">var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
</code></pre>

because of function evaluation, the code above is working like this below

<pre><code class="language-javascript ">@add
function foo() {
}

var counter;
var add;

counter = 0;

add = function () {
  counter++;
};
</code></pre>

So we need to wrap the function in order to decorate.

<pre><code class="language-javascript ">const wrapper = add(foo);
</code></pre>

OK, after looking at these features, I bet it would remind you of HOC in React.

React & Redux

<pre><code class="language-javascript ">class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
</code></pre>

With decorator, we can write like this:

<pre><code class="language-javascript ">@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
</code></pre>

some recommended decorator libraries:

[react-decoration](https://github.com/mbasso/react-decoration): A collection of @decorators for React Components

[recompose](https://github.com/acdlite/recompose): Recompose is a React utility belt for function components and higher-order components. Think of it like lodash for React.