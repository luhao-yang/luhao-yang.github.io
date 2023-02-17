---
id: 173
title: Differences between React and Vue
#date: 2018-01-24T17:04:53+00:00
author: Luhao
summary: After learning React and Vue, I summarize some similarities and differences between them. To gain a better understanding of both two MVVM frameworks, I write these down to remind myself later and share them to you.
layout: post
#guid: http://flywithfan.net/?p=173
#permalink: /javascript/173/
categories:
  - Frontend
tags:
  - javascript
---
After learning React and Vue, I summarize some similarities and differences between them. To gain a better understanding of both two MVVM frameworks, I write these down to remind myself later and share them to you.

React has a very mature ecosystem and start eariler compared to Vue, and it has already hold the place of leading JavaScript framework. Since its popularity in the world-wild usage, you can&#8217;t go wrong with react, just learn it!

Vue is the most fast-growing framework especially in China, probably because of limited the license of react. BTW, the writer of Vue is a Chinese named 尤雨溪, who has majored in Design & Technology in the first place and become a tech-savvy through his own effort. So inspirational, isn&#8217;t it? He has joined into chinese e-commerce giant Alibaba, to build Weex and expand vue ecosystem and community.

Let&#8217;s look at the home page of each first.

React:
  
&#8211; Declarative
  
&#8211; Component-Based
  
&#8211; Learn Once, Write Anywhere

Vue:
  
&#8211; Approachable
  
&#8211; Versatile
  
&#8211; Performant

Here we can see the features including goals of each other from their slogans.

### Differences between React and Vue

**1.render**

Both of them have render function, technically JSX and the Vue template are going to be compiled into pure javascript code, like **_CreateElement_** method.

React using JSX constitute the idea that everything is JavaScript, while Vue using HTML based template syntax is bit of more conventional. I don&#8217;t have preference on any of them, so far both are ok for me.

If you are migrating from React, you can install the [babel](https://github.com/vuejs/babel-plugin-transform-vue-jsx) plugin to write JSX instead of HTML template in Vue, but not vice versa.

**2.data binding**

React do not recommend two-way data binding, but if you insist, you can use [Two-way Binding Helpers](https://reactjs.org/docs/two-way-binding-helpers.html). Alternatively, call setState() explicitly, then react will check if it should update the DOM by comparing the virtual DOM tree.

Vue mixined two-way data binding naturally, it&#8217;s one of the biggest features well known by people. The writer use a very tricky method, Object.defineProperty to redefine its getter/setter of each key of the specific object.
  
After changing the value, Vue will decide whether to update DOM just like react. It&#8217;s really amazing and convenient, I kind of like it. But you should be careful with Array.

**3.Component**

Actually, both React and Vue are component-based, apps built by them are basically the composition of all kinds of components.

React use conventional way to seperate html,js,css files, alright, we don&#8217;t use html in most cases.
  
While, Vue recommend to pack them in single-file components.

**_props_** is an impoartant way of data passing mechanism, props are read-only, it means child component should not change the value of props which come from parent. React calls this &#8220;**_top-down data flow_**&#8220;.
  
Likewise, Vue gives an prime rule **_props down, events up_** , let&#8217;s look at this picture.
  
![props down, events up](https://vuejs.org/images/props-events.png)

In React, it&#8217;s easy to pass data through props when parent tries to communicate with child, whereas child can invoke callback function which passed through props when child tries to communicate with parent, speaking of, without flux or redux.

Although, we can do the same thing(callback function) in Vue, but Vue strongly suggest us using custom event to communicate from child to parent.

Content Distribution :
  
I think Vue has overwhelmed React in this aspect, because vue has several types of slots to make it possible for various kinds of cases. Conversely, React only has this.props.children to refer to the content from parent.

In Vue, you can easily use dynamic component to switch between some giving components, but can&#8217;t in React, you have to use conditions to achieve this goal.

**4.Events**

It seems React dont have custom events for communication, so like I mentioned above, pass callback function as a prop to address this issue.

Every Vue instance implements an events interface, which means it can:
  
&#8211; Listen to an event using $on(eventName)
  
&#8211; Trigger an event using $emit(eventName)

What is wroth mentioning:

> Note that Vue’s event system is different from the browser’s EventTarget API. Though they work similarly, $on and $emit are not aliases for addEventListener and dispatchEvent. 

**5.Context**

I don&#8217;t see this counterpart in Vue. I assume no context in Vue, even in React, it&#8217;s not recommended to use context in development.

But if you insist, you can use this.$parent to find the ancestor of the component, then you can refer to the variable you want to use.

**6.Portals**

Let&#8217;s see what a Portal is:

> Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. 

What the typical usage is:

> A typical use case for portals is when a parent component has an overflow: hidden or z-index style, but you need the child to visually “break out” of its container. For example, dialogs, hovercards, and tooltips. 

I think there should be an alternative solution in Vue, so if you use Vue, try to get around this by designing another plan.

**7.Lifecycle**

React:
  
![React Lifecycle](https://i.pinimg.com/736x/9a/47/85/9a4785fc7d0a9651433877109719a371--life-cycles-software-development.jpg)

Vue:
  
![Vue Lifecycle](https://vuejs.org/images/lifecycle.png)

* * *

Ok, That&#8217;s all for now. I will continue to tell their differences when I gained a deeper understanding of them.

Keep learning, never stop!