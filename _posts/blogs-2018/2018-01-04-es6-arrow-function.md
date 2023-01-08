---
id: 161
title: 'ES6 &#8211; Arrow Function'
#date: 2018-01-04T22:25:04+00:00
author: Luhao
summary: 'An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. '
layout: post
#guid: http://flywithfan.net/?p=161
#permalink: /javascript/161/
categories:
  - JavaScript
tags:
  - es6
---
An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.

> The new.target property lets you detect whether a function or constructor was called using the new operator. In constructors and functions instantiated with the new operator, new.target returns a reference to the constructor or function. In normal function calls, new.target is undefined. 

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function Foo() {
  if (!new.target) throw 'Foo() must be called with new';
  console.log('Foo instantiated with new');
}

Foo(); // throws "Foo() must be called with new"
new Foo(); // logs "Foo instantiated with new"
</code></pre>

### Syntax

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">(param1, param2, …, paramN) =&gt; { statements }
(param1, param2, …, paramN) =&gt; expression
// equivalent to: (param1, param2, …, paramN) =&gt; { return expression; }

// Parentheses are optional when there's only one parameter name:
(singleParam) =&gt; { statements }
singleParam =&gt; { statements }
singleParam =&gt; expression


// The parameter list for a function with no parameters should be written with a pair of parentheses.
() =&gt; { statements }
</code></pre>

### Advanced

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">// Parenthesize the body of function to return an object literal expression:
params =&gt; ({foo: bar})

// Rest parameters and default parameters are supported
(param1, param2, ...rest) =&gt; { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) =&gt; { statements }

// Destructuring within the parameter list is also supported
let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) =&gt; a + b + c;
f();  
// 6
</code></pre>

### Features

Two factors influenced the introduction of arrow functions: shorter functions and non-binding of this.

In ECMAScript 3/5, the this issue was fixable by assigning the value in this to a variable that could be closed over.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `that` variable of which
    // the value is the expected object.
    that.age++;
  }, 1000);
}
</code></pre>

**_Instead_**

An arrow function does not have its own this; the this value of the enclosing execution context is used. Thus, in the following code, the this within the function that is passed to setInterval has the same value as this in the enclosing function:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function Person(){
  this.age = 0;

  setInterval(() =&gt; {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
</code></pre>

### No binding of arguments

Arrow functions do not have their own arguments object. Thus, in this example, arguments is simply a reference to the the arguments of the enclosing scope:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var arguments = [1, 2, 3];
var arr = () =&gt; arguments[0];

arr(); // 1

function foo(n) {
  var f = () =&gt; arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
  return f();
}

foo(1); // 2
</code></pre>

In most cases, using rest parameters is a good alternative to using an arguments object.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function foo(n) { 
  var f = (...args) =&gt; args[0] + n; 
  return f(10); 
}

foo(1); // 11
</code></pre>

**_ALSO_**

  * Arrow functions cannot be used as constructors and will throw an error when used with new.
  * Arrow functions do not have a prototype property.
  * The yield keyword may not be used in an arrow function&#8217;s body (except when permitted within functions further nested within it). As a consequence, arrow functions cannot be used as generators.

### Function body

Arrow functions can have either a &#8220;concise body&#8221; or the usual &#8220;block body&#8221;.

In a concise body, only an expression is specified, which becomes the explicit return value. In a block body, you must use an explicit return statement.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var func = x =&gt; x * x;                  
// concise body syntax, implied "return"

var func = (x, y) =&gt; { return x + y; }; 
// with block body, explicit "return" needed
</code></pre>

### Returning object literals

Keep in mind that returning object literals using the concise body syntax params => {object:literal} will not work as expected.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascipt">var func = () =&gt; { foo: 1 };               
// Calling func() returns undefined!

var func = () =&gt; { foo: function() {} };   
// SyntaxError: function statement requires a name

//Remember to wrap the object literal in parentheses.
var func = () =&gt; ({foo: 1});

</code></pre>

* * *

LINKS:
  
[Arrow Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)