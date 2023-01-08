---
id: 157
title: 'ES6 &#8211; Destructuring'
#date: 2018-01-02T22:59:45+00:00
author: Luhao
summary: The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
layout: post
#guid: http://flywithfan.net/?p=157
#permalink: /javascript/157/
categories:
  - JavaScript
tags:
  - es6
---
# Destructuring

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

## Array destructuring

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var foo = ['one', 'two', 'three'];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
</code></pre>

#### Default values

A variable can be assigned a default, in the case that the value unpacked from the array is **_undefined_**.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
</code></pre>

### Assigning the rest of an array to a variable

When destructuring an array, you can unpack and assign the remaining part of it to a variable using the rest pattern:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
</code></pre>

* * *

## Object destructuring

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true
</code></pre>

A variable can be assigned its value with destructuring separate from its declaration.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var a, b;

({a, b} = {a: 1, b: 2});
</code></pre>

> {a, b} = {a: 1, b: 2} is not valid stand-alone syntax, as the {a, b} on the left-hand side is considered a block and not an object literal.
> 
> However, ({a, b} = {a: 1, b: 2}) is valid, as is var {a, b} = {a: 1, b: 2} 

* * *

#### PRACTICAL APPLICATION:

ES5 version

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function drawES5Chart(options) {
  options = options === undefined ? {} : options;
  var size = options.size === undefined ? 'big' : options.size;
  var cords = options.cords === undefined ? {x: 0, y: 0} : options.cords;
  var radius = options.radius === undefined ? 25 : options.radius;
  console.log(size, cords, radius);
  // now finally do some chart drawing
}

drawES5Chart({
  cords: {x: 18, y: 30},
  radius: 30
});
</code></pre>

ES2015(ES6) version

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function drawES2015Chart({size = 'big', cords = {x: 0, y: 0}, radius = 25} = {}) {
  console.log(size, cords, radius);
  // do some chart drawing
}

drawES5Chart({
  cords: {x: 18, y: 30},
  radius: 30
});
</code></pre>

* * *

### Nested object and array destructuring

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var metadata = {
    title: 'Scratchpad',
    translations: [
       {
        locale: 'de',
        localization_tags: [],
        last_edit: '2014-04-14T08:43:37',
        url: '/de/docs/Tools/Scratchpad',
        title: 'JavaScript-Umgebung'
       }
    ],
    url: '/en-US/docs/Tools/Scratchpad'
};

var {title: englishTitle, translations: [{title: localeTitle}]} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
</code></pre>

### For of iteration and destructuring

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
      sister: 'Samantha Smith'
    },
    age: 35
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones',
      brother: 'Howard Jones'
    },
    age: 25
  }
];

for (var {name: n, family: {father: f}} of people) {
  console.log('Name: ' + n + ', Father: ' + f);
}
</code></pre>

### Computed object property names and destructuring

Computed property names, like on object **_literals_**, can be used with destructuring.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">let key = 'z';
let {[key]: foo} = {z: 'bar'};

console.log(foo); // "bar"
</code></pre>

### Rest in Object Destructuring

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
a; // 10 
b; // 20 
rest; // { c: 30, d: 40 }
</code></pre>

LINKS:

[Destructuring assignment &#8211; MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/destructuring)