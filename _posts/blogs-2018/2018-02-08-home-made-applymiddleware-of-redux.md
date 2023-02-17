---
id: 189
title: My applyMiddleware of redux
#date: 2018-02-08T21:21:48+00:00
author: Luhao
summary: After reading the Async Actions and Middleware chapters of redux tutorial, I implemented my own middleware thunk...
layout: post
#guid: http://flywithfan.net/?p=189
#permalink: /javascript/189/
categories:
  - Frontend
tags:
  - javascript
---

After reading the **Async Actions** and **Middleware** chapters of redux tutorial, I implemented my own middleware thunk, you can see this [demo](/assets/demo/middleware.html).

In the example of offcial guide, it is considering the synchronous case so I just want to produce a **applyMiddleware** which could be applid both to sync and async function. I know they have already done that, but I just want to practice and make it my own way.

In order to apply to both sync and async situation, we need our middlewares returning a promise object, which, for sync functions, it is already resolved.

I used these techniques:

1. arrow function
2. currying
3. deferred calculation
4. reduce

I think you can easily understand these code with those knowledge I mentioned above. So I will pass explaination, haha&#8230;

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">    &lt;div&gt;
        &lt;input type="text" id="msg" /&gt;
        &lt;button onclick="submit()"&gt;submit&lt;/button&gt;
        &lt;button onclick="apply()"&gt;applyMiddleware&lt;/button&gt;
        &lt;p id="result"&gt;&lt;/p&gt;
    &lt;/div&gt;
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var input = document.querySelector('#msg')
        var p = document.querySelector('#result')
        p.innerHTML = 'input some characters then submit'

        function submit() { store.dispatch(input.value) }

        function apply() { 
            store = applyMiddleware(store, proc1, proc2)
            p.innerHTML = 'applied! try again'
         }


        function createStore() {
            return {
                dispatch: str =&gt; p.innerHTML = 'dispatch: ' + str
            }
        }

        var store = createStore()

        const proc1 = next =&gt; str =&gt; Promise.resolve('proc1(' + str + ')').then(value =&gt; next(value))

        const proc2 = next =&gt; str =&gt; new Promise((resolve, reject) =&gt; {
            p.innerHTML = 'requesting... wait 2 seconds'
            setTimeout(() =&gt; {
                if (str.indexOf('yang') != -1) {
                    resolve('proc2(' + str + ')')
                } else {
                    reject('proc2_fault(' + str + ')')
                }
            }, 2000)
        }).then(value =&gt; next(value)).catch(reason =&gt; next(reason))


        function applyMiddleware(store, ...procs) {
            var handlers = procs.slice().reverse()
            var dispatch = str =&gt; handlers.reduce((result, handler) =&gt; handler(result), store.dispatch)(str)
            return Object.assign({}, store, {
                dispatch
            })
        }
</code></pre>

---

LINKS:

[Middleware](https://redux.js.org/docs/advanced/Middleware.html)
