---
id: 300
title: "Mocha/chai &#8211; JavaScript unit testing"
#date: 2018-02-20T11:22:02+00:00
author: Luhao
summary: "Let's go with the one of the most popular JavaScript unit testing framework!"
layout: post

categories:
  - Frontend
tags:
  - testing
---

![](https://camo.githubusercontent.com/7fbd61a113b7f10ed1709e74f3715a2a60ba5177/687474703a2f2f61706974657374696e672e626967737469636b6361727065742e636f6d2f6173736574732f696d672f6d6f6368612d636861692f6c6f676f2e706e67)

## Mocha

> Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

Mocha allows you to use **any** assertion library you wish.This means you can use libraries such as:

- chai &#8211; expect(), assert() and should-style assertions
- should.js &#8211; BDD style shown throughout these docs
- expect.js &#8211; expect() style assertions
- better-assert &#8211; C-style self-documenting assert()
- unexpected &#8211; “the extensible BDD assertion toolkit”

**describe**: describe() is simply a way to group our tests in Mocha

**it**: it() is used for an individual test case.

### Asynchronous test

let&#8217;s assume we have these functions below.

<pre><code class="language-javascript ">function add(a,b){
    return a + b
}

function addAsync(a,b,func) {
    let f = func.bind(this, add(a,b));
    setTimeout(f, 1000)
}

function addPromise(a,b) {
    return new Promise(function(resolve) {
        setTimeout(() =&gt; resolve(add(a,b)), 1000)
    })
}

//synchronous testing
describe('my test suite', function(){
    it('test add', function(){
        let result = add(1,2)
        expect(result).to.equal(3)
    })
})

</code></pre>

**1.callback**

<pre><code class="language-javascript ">describe('my test suite', function(){
    it('test addAsync', function(done){
        addAsync(3,4,result =&gt; {
            expect(result).to.equal(7)
            done()//tell mocha this testing case is done then go next
        })
    })
})
</code></pre>

**2.promise**

<pre><code class="language-javascript ">describe('my test suite', function(){
    it('test addPromise case 1', function(){
        let pro1 = addPromise(1,2)
        return pro1.then(val =&gt; {
            expect(val).to.equal(3)
        })
    })
})
</code></pre>

**3.async/await**

<pre><code class="language-javascript ">describe('my test suite', function(){
    it('test addPromise case 2', async function(){
        let result = await addPromise(2,2)
        expect(result).to.equal(4)
    })
})
</code></pre>

![](/assets/img/uploads/2018/mocha-test-e1532255632563.png)

### hooks

Mocha provides the hooks before(), after(), beforeEach(), and afterEach()

<pre><code class="language-javascript ">describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases
});
</code></pre>

All hooks (before(), after(), beforeEach(), afterEach()) may be **sync or async** as well, behaving much like a regular test-case.

### retry tests

<pre><code class="language-javascript ">describe('retries', function() {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
</code></pre>

### dynamically generating tests

Given Mocha’s use of Function.prototype.call and function expressions to define suites and test cases, it’s straightforward to generate your tests dynamically. No special syntax is required — plain ol’ JavaScript can be used to achieve functionality similar to “parameterized” tests, which you may have seen in other frameworks.

<pre><code class="language-javascript ">var assert = require('chai').assert;

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
</code></pre>

Output:

<pre><code class="">  add()
    ✓ correctly adds 2 args
    ✓ correctly adds 3 args
    ✓ correctly adds 4 args
</code></pre>

## Chai

> Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

TDD assert style: more classical

<pre><code class="language-javascript ">var assert = require('chai').assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.typeOf(foo, 'string'); // without optional message
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
</code></pre>

Some may love the classical asserion style, especially from compiled language such as Java, C/C++, but I prefer the BDD styles, which I think is definitely more popular.

Chain-capable BDD styles: expressive & readable

There are two preferences, that one is **_Expect_** and the other is **_Should_** .

### Expect

Expect require is just a **reference** to the expect function.

<pre><code class="language-javascript ">var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);
</code></pre>

### Should

Should require the function is being **executed**.

It extends **Object.prototype** to provide a single getter as the starting point for your language assertions. It works on node.js and in all modern browsers except Internet Explorer.

<pre><code class="language-javascript ">var should = require('chai').should() //actually call the function
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);
</code></pre>

Also what needs to mention is that, there are some scenarios where should will not work.

<pre><code class="language-javascript ">db.get(1234, function (err, doc) {
  // we expect error to not exist
  // we expect doc to exist and be an object
});

//but if err is null or undefined, err.should.not.exist would work. We need write this way:

var should = require('chai').should();
db.get(1234, function (err, doc) {
  should.not.exist(err);
  should.exist(doc);
  doc.should.be.an('object');
});
</code></pre>

helpers to keep you out of trouble:

- should.exist
- should.not.exist
- should.equal
- should.not.equal
- should.Throw
- should.not.Throw

### Configuration

**config.includeStack** indicates whether stack trace is included in Assertion error message. Default value is **false**.

<pre><code class="language-javascript ">chai.config.includeStack = true; // turn on stack trace
</code></pre>

**config.showDiff** indicates whether or not the showDiff flag should be included in the thrown AssertionErrors. Default value is **true**.

<pre><code class="language-javascript ">chai.config.showDiff = false; // turn off reporter diff display
</code></pre>

**config.truncateThreshold** indicates if this threshold is exceeded, the value is truncated. Default value is **40**.

<pre><code class="language-javascript ">chai.config.truncateThreshold = 0; // disable truncating
</code></pre>
