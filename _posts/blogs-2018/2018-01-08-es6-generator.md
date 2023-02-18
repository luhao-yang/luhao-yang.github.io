---
id: 163
title: "ES6 &#8211; Generator"
#date: 2018-01-08T17:26:58+00:00
author: Luhao
summary: The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol
layout: post

categories:
  - Frontend
tags:
  - javascript
---

The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.

### iterable protocol

The iterable protocol allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a for..of construct. Some built-in types are built-in iterables with a default iteration behavior, such as Array or Map, while other types (such as Object) are not.

In order to be iterable, an object must implement the @@iterator method, meaning that the object (or one of the objects up its prototype chain) must have a property with a @@iterator key which is available via constant Symbol.iterator:

**[Symbol.iterator]** : A zero arguments function that returns an object, conforming to the iterator protocol.

### iterator protocol

The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite).

An object is an iterator when it implements a next() method with the following semantics:

A zero arguments function that returns an object with two properties:

- done (boolean)
  - Has the value true if the iterator is past the end of the iterated sequence. In this case value optionally specifies the return value of the iterator. The return values are explained here.
  - Has the value false if the iterator was able to produce the next value in the sequence. This is equivalent of not specifying the done property altogether.
- value &#8211; any JavaScript value returned by the iterator. Can be omitted when done is true.

The next method always has to return an object with appropriate properties including done and value. If a non-object value gets returned (such as false or undefined), a TypeError (&#8220;iterator.next() returned a non-object value&#8221;) will be thrown.

---

Generator has three methods:

**Generator.prototype.next()**

Returns a value yielded by the yield expression.

**Generator.prototype.return()**

Returns the given value and finishes the generator.

**Generator.prototype.throw()**

Throws an error to a generator.

### Examples

An infinite iterator

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function* idMaker() {
    var index = 0;
    while(true)
        yield index++;
}

var gen = idMaker(); // "Generator { }"

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// ...
</code></pre>

return method:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }

</code></pre>

If return(value) is called on a generator that is already in &#8220;completed&#8221; state, the generator will remain in &#8220;completed&#8221; state. If no argument is provided, the return object is the same as if .next(). If an argument is provided, it will be set to the value of the value property of the returned object.

### APPLICATIONS

1.build Iterator API

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javasctipt">function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i &lt; keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

</code></pre>

2.async to sync

Before ES6, there are 4 types of async programming:

- callbacks
- event listening
- publish/subscribe
- Promise

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-JavaScript">var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

//because fetch return a promise object
result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});

</code></pre>

---

LINKS:

[Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)

[Generator 函数的异步应用](http://es6.ruanyifeng.com/#docs/generator-async)
