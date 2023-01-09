---
layout: post
title: Redux-Observable
featured-img: sleek
mathjax: true
categories: 
- JavaScript
tags:
- javascript
---


# RxJS

>RxJS is a library for composing asynchronous and event-based programs by using observable sequences. 

Think of RxJS as Lodash for events. Its coding pattern includes:
- Observer pattern 
- Iterator pattern 
- functional programming with collections

Essential concepts from official website:

The essential concepts in RxJS which solve async event management are:

* **Observable**: represents the idea of an invokable collection of future values or events.
* **Observer**: is a collection of callbacks that knows how to listen to values delivered by the Observable.
* **Subscription**: represents the execution of an Observable, is primarily useful for cancelling the execution.
* **Operators**: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
* **Subject**: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
* **Schedulers**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

For more, visit [API reference](https://rxjs-dev.firebaseapp.com/api). 

RxJS is so popular in the past year, which I think it would continue to shine in the future. Its emergence is not to replace any view framwork, like react, angular, vue; it is used combined with them, because of its purity, flow, and elegant but powerful.

# Redux-Observable

>RxJS 6-based middleware for Redux. Compose and cancel async actions to create side effects and more.


![](http://img.youtube.com/vi/AslncyG8whg/0.jpg)

To install, `npm install --save redux-observable`


***I am happy to find that redux-Observable is a very good replacement of redux-thunk!***


## Epic

An Epic is the core primitive of redux-observable, which takes a stream of actions and returns a stream of actions.  signature:

```javascript
function (action$: Observable<Action>, state$: StateObservable<State>): Observable<Action>;
```

PLEASE REMEMBER **Actions in, actions out.**

**Taboos**: If you return the same actions, it will create an infinite loop!!!

```javascript
const actionEpic = action$ => action$; // creates infinite loop
```


Understand how it works:
1. reducers handle the state, while epics handles actions
2. in response to some actions you received, then emit other actions
3. the actions you emit will be dispatched by redux-Observable immediately

deal with the side effects, e.g asynchronous: after you dispatched an action, which could be perceived by redux-Observable; then dealing with side effects in the flow, ended it up with actions going to reducers again to complete the final process.


```javascript
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './modules/root';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpic);

  return store;
}
```

```javascript
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import ping, { pingEpic } from './ping';
import users, { fetchUserEpic } from './users';

export const rootEpic = combineEpics(
  pingEpic,
  fetchUserEpic
);

export const rootReducer = combineReducers({
  ping,
  users
});
```

```javascript
const pingEpic = action$ => action$.pipe(
  filter(action => action.type === 'PING'),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: 'PONG' })
);

// ... fetchUserEpic

```

It is said:

redux-observable (because of RxJS) truly shines the most for complex async/side effects. If you're not already comfortable with RxJS you might consider using redux-thunk for simple side effects and then use redux-observable for the complex stuff. That way you can remain productive and learn RxJS as you go. redux-thunk is much simpler to learn and use, but that also means it's far less powerful. Of course, if you already love Rx like we do, you will probably use it for everything! 

According to the npm trending, redux-observable is not as popular as redux-thunk in the last 6 months, but with the rising of RxJS, it would finally catch up with redux-thunk and even overtake it.

![](/assets/img/uploads/2018/trending.png)





