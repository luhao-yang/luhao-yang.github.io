---
id: 204
title: Redux-thunk vs Redux saga
#date: 2018-03-12T11:18:33+00:00
author: Luhao
summary: 'A glimpse of Redux-thunk and Redux saga '
layout: post
#guid: http://flywithfan.net/?p=204
#permalink: /javascript/204/
categories:
  - JavaScript
tags:
  - javascript
---
## What is redux-thunk

A thunk is a function that wraps an expression to delay its evaluation.

Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

An action creator that returns a **function** to perform asynchronous dispatch:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

//normal synchronous action creator, return a object
function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

//asynchronous action creator, return a function!
function incrementAsync() {
  return dispatch =&gt; {
    setTimeout(() =&gt; {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
</code></pre>

That&#8217;s it, super simple!

### How it works

Your async action creator returns a function which will hand in the control to redux-thunk middleware, after its process the dispatch function will be passed to your function as an argument, so you can call dispatch in your completion part of async action.

## what is redux-sage

It uses an ES6 feature called Generators to make those asynchronous flows easy to **read, write and test**.

You might&#8217;ve used redux-thunk before to handle your data fetching. Contrary to redux thunk, you don&#8217;t end up in callback hell, you can test your asynchronous flows easily and your actions stay pure.

let&#8217;s see some concepts first.

**Effects:**
  
To express the Saga logic, we yield plain JavaScript Objects from the Generator. We call those Objects Effects.An Effect is simply an object that contains some information to be interpreted by the middleware.

### How it works

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">import { takeEvery } from 'redux-saga/effects'
import Api from './path/to/api'

function* watchFetchProducts() {
  yield takeEvery('PRODUCTS_REQUESTED', fetchProducts)
}

//what we expect to do
function* fetchProducts() {
  const products = yield Api.fetch('/products')
  dispatch({ type: 'PRODUCTS_RECEIVED', products })
}
</code></pre>

Instead of invoking the asynchronous function directly from inside the Generator, we can yield only a description of the function invocation. i.e. We&#8217;ll simply yield an object which looks like

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">// Effect -&gt; call the function Api.fetch with `./products` as argument
{
  CALL: {
    fn: Api.fetch,
    args: ['./products']
  }
}
</code></pre>

Put another way, the Generator will yield plain Objects containing instructions, and the redux-saga middleware will take care of executing those instructions and **giving back** the result of their execution to the Generator.

> **Writer&#8217;s note: the function must return a Promise, then saga knows how to give the result back.** 

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">import { call } from 'redux-saga/effects'

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // ...
}
</code></pre>

We&#8217;re using now the **call**(fn, &#8230;args) function. **The difference from the preceding example is that now we&#8217;re not executing the fetch call immediately, instead, call creates a description of the effect**.

Similar to the dispatch function, we need the same declarative solution. Just create an Object to instruct the middleware that we need to dispatch some action, and let the middleware perform the real dispatch. This way we can test the Generator&#8217;s dispatch in the same way: by just inspecting the yielded Effect and making sure it contains the correct instructions.

The library provides, for this purpose, another function **put** which creates the dispatch Effect.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">import { call, put } from 'redux-saga/effects'
// ...

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // create and yield a dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}
</code></pre>

Then the rest APIs can be deduced in this way above.

**Fork** execute an non-blocking process.

**Take** pause and wait for action coming.

**Race** execute some effects simultaneously, if one is done, canel others.

**Call** invode a function, which，if returns a Promise, stop execution and wait for the result.

**Put** invoke Action, like dispatch.

**Select** invoke in order to get state.

**takeLatest** return latest effet&#8217;s result.

so, simply put

> Saga = Worker + Watcher 

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function* watcher() {
  while(true) {
    const action = yield take(ACTION)
    yield fork(worker, action.payload)
  }
}

function* worker(payload) {
  // ... do some stuff
}
</code></pre>

### My Opinion

So redux-thunk is very easy to learn, and you can use Promise or callbacks to implement your async process, which is fairly flexible.
  
But it is a bit tricky when you try to test the action process.

On the contrary, redux-sage has huge advantages in reading and testing, because it allows you to write the code logic like synchronous process, thanks to generator. But you must use Promise, and comprehending the whole bunch of things is not friendly to beginners.

see more detail: [redux-saga](https://redux-saga.js.org/) [redux-thunk](https://github.com/gaearon/redux-thunk)