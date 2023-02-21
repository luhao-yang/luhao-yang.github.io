---
layout: post
title: "Kotlin coroutine basics and some thoughts"
featured-img: kotlin
categories:
  - Backend
tags:
  - kotlin
---

# Coroutine basics

- **What is coroutine?**

A coroutine is an instance of suspendable computation.

- **What does it do?**

It is conceptually similar to a thread, in the sense that it takes a block of code to run that works concurrently with the rest of the code.

- **What benefits does it have?**

Lightweight, Built-in cancellation support, Fewer memory leak, etc...

<p style="color: orange">**Note**: A coroutine is not bound to any particular thread. It may suspend its execution in one thread and resume in another one. </p>

# Key functions

## runBlocking

`runBlocking` is also a coroutine builder that **bridges** the non-coroutine world of a regular fun main() and the code with coroutines inside of `runBlocking { ... }` curly braces. This is highlighted in an IDE by `this: CoroutineScope` hint right after the `runBlocking` opening curly brace.

```kotlin
fun main() = runBlocking { // this: CoroutineScope
    launch { doWorld() }
    println("Hello")
}

// this is your first suspending function
suspend fun doWorld() {
    delay(1000L)
    println("World!")
}

```

## lauch

launch is a coroutine builder. It launches a new coroutine concurrently with the rest of the code, which continues to work independently.

```kotlin
fun main() = runBlocking { // this: CoroutineScope
    launch { // launch a new coroutine and continue
        delay(1000L) // non-blocking delay for 1 second (default time unit is ms)
        println("World!") // print after delay
    }
    println("Hello") // main coroutine continues while a previous one is delayed
}
```

A `launch` coroutine builder returns a `Job` object that is a handle to the launched coroutine and can be used to explicitly wait for its completion.

```kotlin
val job = launch { // launch a new coroutine and keep a reference to its Job
    delay(1000L)
    println("World!")
}
println("Hello")
job.join() // wait until child coroutine completes
println("Done")
```

## async

`async` starts a new coroutine and returns a `Deferred` object. `Deferred` represents a concept known by other names such as `Future` or `Promise`. It stores a computation, but it defers the moment you get the final result; it promises the result sometime in the future.

> The main difference between async and launch is that launch is used to start a computation that isn't expected to return a specific result. launch returns a Job that represents the coroutine. It is possible to wait until it completes by calling Job.join()

here is the official example of `async`

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val deferred: Deferred<Int> = async {
        loadData()
    }
    println("waiting...")
    println(deferred.await())
}

suspend fun loadData(): Int {
    println("loading...")
    delay(1000L)
    println("loaded!")
    return 42
}
```

# More concepts

## Scope builder

Besides the built-in coroutine builders, you can declare your own scope using the coroutineScope builder which creates a coroutine scope and does not complete until all launched children complete.

```scope
suspend fun doWorld() = coroutineScope {  // this: CoroutineScope
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello")
}
```

## Global Scope

you can also start a new coroutine from the global scope using `GlobalScope.async` or `GlobalScope.launch`. This will create a **top-level** "independent" coroutine.

## Cancellation

Coroutine cancellation is cooperative. A coroutine code has to cooperate to be cancellable. All the suspending functions in kotlinx.coroutines are cancellable. They check for cancellation of coroutine and throw CancellationException when cancelled.

**However, if a coroutine is working in a computation and does not check for cancellation, then it cannot be cancelled.**

```kotlin
val job = launch(Dispatchers.Default) {
    repeat(5) { i ->
        try {
            // print a message twice a second
            println("job: I'm sleeping $i ...")
            delay(500)
        } catch (e: Exception) {
            // log the exception
            println(e)
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
```

## Coroutine context

The coroutine context is a set of various elements. The main elements are the `Job` and its `dispatcher`. The coroutine dispatcher can confine coroutine execution to a specific thread, dispatch it to a thread pool, or let it run unconfined.

```kotlin
launch { // context of the parent, main runBlocking coroutine
    println("main runBlocking      : I'm working in thread ${Thread.currentThread().name}")
}
launch(Dispatchers.Unconfined) { // not confined -- will work with main thread
    println("Unconfined            : I'm working in thread ${Thread.currentThread().name}")
}
launch(Dispatchers.Default) { // will get dispatched to DefaultDispatcher
    println("Default               : I'm working in thread ${Thread.currentThread().name}")
}
launch(newSingleThreadContext("MyOwnThread")) { // will get its own new thread
    println("newSingleThreadContext: I'm working in thread ${Thread.currentThread().name}")
}
```

> The Dispatchers.Unconfined coroutine dispatcher starts a coroutine in the caller thread, but only until the first suspension point. After suspension it resumes the coroutine in the thread that is fully determined by the suspending function that was invoked.

## Shared mutable state and concurrency

This topic is really important in the currency world so it's less prone to bugs if you understand it very well. Just gonna share the official link here for you to explore.
https://kotlinlang.org/docs/shared-mutable-state-and-concurrency.html

# Comparison to async/await in JavaScript

Here is a classic example in which you have a `async` function and writing code like synchrounous by using `await`. Wrting asynchrous code becomes really easy since ES7.

```javascript
async function task() {
  const response = await fetch("example.com");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  // ...
}
```

It is worth noting that `async` and `await` are both **keyword** in ES7 and above. That means this is language level feature and sugar syntax for developers. While in kotlin, `async` is a method and there is really only one keyword `suspend` in kotlin.

In Kotlin, you can not call `suspend` function out of scope in main thread so you need a bridge function like `runblocking/lauch/async`, which is very much like `await` in JavaScript.

But things get to change since ECMA2022, one of the biggest feature is **Top level await**, meaning you can use the `await` keyword on its own (outside of an `async` function) at the top level of a module.
