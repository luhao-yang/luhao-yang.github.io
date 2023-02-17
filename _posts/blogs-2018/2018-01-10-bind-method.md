---
id: 165
title: bind method
#date: 2018-01-10T23:10:44+00:00
author: Luhao
summary: The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
layout: post
#guid: http://flywithfan.net/?p=165
#permalink: /javascript/165/
categories:
  - Frontend
tags:
  - javascript
---

Before ES2015, we get used to using apply and call, now let&#8217;s take a look at bind method

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">fun.bind(thisArg[, arg1[, arg2[, ...]]])
</code></pre>

**thisArg**

The value to be passed as the this parameter to the target function when the bound function is called. The value is ignored if the bound function is constructed using the new operator.

**arg1, arg2, &#8230;**

Arguments to prepend to arguments provided to the bound function when invoking the target function.

**Return value**

A copy of the given function with the specified this value and initial arguments.

### Description

The bind() function creates a new bound function (BF). A BF is an exotic function object (a term from ECMAScript 2015) that wraps the original function object. Calling a BF generally results in the execution of its wrapped function.

A BF has the following internal properties:

- **[[BoundTargetFunction]]** &#8211; the wrapped function object;
- **[[BoundThis]]** &#8211; the value that is always passed as this value when calling the wrapped function.
- **[[BoundArguments]]** &#8211; a list of values whose elements are used as the first arguments to any call to the wrapped function.
- **[[Call]]** &#8211; executes code associated with this object. Invoked via a function call expression. The arguments to the internal method are a this value and a list containing the arguments passed to the function by a call expression.

When bound function is called, it calls internal method **[[Call]]** on **[[BoundTargetFunction]]**, with following arguments **Call(boundThis, args)**. Where, boundThis is **[[BoundThis]]**, args is **[[BoundArguments]]** followed by the arguments passed by the function call.

A bound function may also be constructed using the new operator: doing so acts as though the target function had instead been constructed. The provided this value is ignored, while prepended arguments are provided to the emulated function.

---

1.to make a function with pre-specified initial arguments

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(null, 37);

var list2 = leadingThirtysevenList(); 
// [37]

var list3 = leadingThirtysevenList(1, 2, 3);
// [37, 1, 2, 3]
</code></pre>

2.setTimeout

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function LateBloomer() {
  this.petalCount = Math.floor(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  
// after 1 second, triggers the 'declare' method
</code></pre>

3.Creating shortcuts()

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var slice = Array.prototype.slice;

// ...

slice.apply(arguments);

// same as "slice" in the previous example
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);

</code></pre>

Polyfill:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
</code></pre>

---

LINKS:

[bind-MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
