---
id: 191
title: Re-discuss about generator and async/await
#date: 2018-02-15T22:50:28+00:00
author: Luhao
summary: A further discussion about generator and async programming
layout: post
#guid: http://flywithfan.net/?p=191
#permalink: /javascript/191/
categories:
  - Frontend
tags:
  - javascript
---

Generator is a powerful feature of ES6, which conforms to both the iterable protocol and the iterator protocol. Besides, Generator could be used to write asynchronous process. On the other hand, async/await is introduced to specilize in async process.

## Brief intro

let&#8217;s take a loot at how to use generator function to accomplish this operation

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">&lt;br />    /**
     *  using setTimeout to simulate a async request 
     */
    function requestA(data,callback) {
        setTimeout(() =&gt; {
            callback({
                ...data,
                flag: true
            })
        },1000)
    }


    function* gen(){
        console.log('start')
        yield requestA({name: 'yang'}, (data) =&gt; console.log(data))
        yield requestA({name: 'fan'}, (data) =&gt; console.log(data))
        console.log('finish')
    }

    var it = gen()
    it.next()
    it.next()
    setTimeout(() =&gt; {
        it.next()
    },1500)


    /** console output:

 start
 {name: "yang", flag: true}
 {name: "fan", flag: true}
 finish

    */

</code></pre>

## Refactor for async programming

Ideally, we want the generator automatically execute this segment of code.

The key is to find a way to give control to callbacks inside generator function then give control back to generator. Hence, what we need is:

1. a thunk funtion wrapping the original async function
2. a auto execution process

### for callbacks

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">&lt;br />        /**
     * thunk is a function returning a new function
     * it receives a function and return a function which expects arguments,
     * then push a function into arguments to execute another function indicating
     * the next step. Actually, it delays the exection of func until invoke it the 
     * second time.
     */
    function thunk(func) {
        return (...args) =&gt; (next) =&gt; {
            args.push((data) =&gt; {
                next(data)
            })
            func.apply(null,args)
        }
    }

    /**
     * equivalent form
     *
    function thunk(func) {
        return function(){
            var args = Array.prototype.slice.call(arguments)
            return function(next){
                args.push(function(data){
                    next(data)
                })
                func.apply(null,args)
            }
        }
    }
    */

        function* start() {
        //thunkify a function return a warpped function
        var requestAThunk = thunk(requestA)
        //requestAThunk({name: 'yang'}) would return a function taking a next function as its parameter
        var result1 = yield requestAThunk({name: 'yang'})
        console.log(`result1 is ${JSON.stringify(result1)}`)
        //handel with the result...
        var result2 = yield requestAThunk({name: 'fan'})
        console.log(`result2 is ${JSON.stringify(result2)}`)
        //handel with the result...
        return [result1,result2]        
    }

    /**
     * iterate one by one, the thing is that giving control to callback,
     * after async finished, call next of the iterator
     */ 
    function autoexecutor(g, callback) {
        var it = g()
        //!function(){//...}() this expression defines a function and invokes it immediately
        !function go(data) {
            //next() method with parameters would send the parameters to the generator
            let next = it.next(data)
            if(next.done) {
                //last callback is going to take the value of return expression of generator
                callback.call(null,next.value)
                return
            }
            try{
                //invoke the thunkified function, pass a function to take over control
                next.value(result =&gt; go(result))
            }catch(e) {
                console.log(e)
            }
        }()
    }

    autoexecutor(start, result =&gt; {
        console.log(`last result is ${JSON.stringify(result)}`)
    })


    /** console ouput:

        result1 is {"name":"yang","flag":true}
        result2 is {"name":"fan","flag":true}
        last result is [{"name":"yang","flag":true},{"name":"fan","flag":true}]
    */

</code></pre>

Actually, if we use Promise to implement async process it would be much eaiser to refactor. Let&#8217;s see.

### for Promise

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">    function requestB(data) {
        return new Promise( (resolve, reject) =&gt; {
                setTimeout(() =&gt; {
                    resolve(Object.assign({},data,{resolve:true}))
                },1000)
            }).then(result =&gt; {
                console.log(`got ${JSON.stringify(result)}`)
                return result
        })
    }

    function* process() {
        let result1 = yield requestB({userId:'12345'})
        let result2 = yield requestB({type:'info'})
        return [result1, result2]
    }

    function executor(g) {
        let it = g()
        return new Promise((resolve,reject) =&gt; {
            !function go(data) {
                let next = it.next(data)
                if(next.done) {
                    resolve(next.value)
                    return
                }
                next.value.then(value =&gt; {
                    go(value)
                }).catch(error =&gt; {
                    throw new Error(error)
                })
            }()
        })
    }

    /** console outpt

    got {"userId":"12345","resolve":true}
    got {"type":"info","resolve":true}
    final result is [{"userId":"12345","resolve":true},{"type":"info","resolve":true}]
    */
</code></pre>

Have you realized that we basically already implement the async/await

keyword?

## Async/await

When an async function is called, it returns a Promise. When the async function returns a value, the Promise will be resolved with the returned value. When the async function throws an exception or some value, the Promise will be rejected with the thrown value.

An async function can contain an await expression, that pauses the execution of the async function and waits for the passed Promise&#8217;s resolution, and then resumes the async function&#8217;s execution and returns the resolved value.

> The purpose of async/await functions is to simplify the behavior of using promises synchronously and to perform some behavior on a group of Promises. Just as Promises are similar to structured callbacks, async/await is similar to combining generators and promises

let&#8217;s see the example.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">    async function proc() {
        let result1 = await requestB({userId:'12345'})
        let result2 = await requestB({type:'info'})
        return [result1, result2]
    }

    proc().then(result =&gt; {
        console.log(`final result is ${JSON.stringify(result)}`)
    })

    /** console output

    got {"userId":"12345","resolve":true}
    got {"type":"info","resolve":true}
    final result is [{"userId":"12345","resolve":true},{"type":"info","resolve":true}]
    */

</code></pre>
