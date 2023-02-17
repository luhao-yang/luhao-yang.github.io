---
layout: post
title: "Render Props vs. HOC"
featured-img: emile-perron-190221
categories: [react, javascript]
categories:
  - Frontend
tags:
  - react
---

When "Render Props" hits me, I was a little shocked because I couldn't recall any memories about it. So I checked it soon when I came back. As thought, this feature is pretty new.

Let's take a look at what is Render Props first.

>Render Props refers to a simple technique for sharing code between React components using a prop whose value is a function.

```javascript
import React, { Component } from 'react';

class RenderProps extends Component {
  render() {
    return (<Child renderFunc={data => (
      <h1>Hello {data}</h1>
    )}/>);
  }
}

class Child extends Component {
  render() {
    return <div>{this.props.renderFunc('World')}</div>;
  }
}

//render:
<div>
	<h1>Hello World</h1>
</div>
```

I **intentionally** changed the name of this "render" prop to "renderFunc", just to tell you that whatever the name is doesn't matter the result. We need to grasp the idea behind this, which I call,  **"Inversion of Control"**.

Nomarlly, the parent component passes the *props* into the child component, and the child component controls how to display or deal with those *props*.
However, in the Render Props case, the child component passes *props* into the parent component while the parent component is in charge of dealing with the data.

But I must emphasize that the funtion which is passing into as a prop is mainly used for displaying! That's why we call it **Render Props**.


One of the most commonly used scene of Render Props is mostly about **Cross-Cutting Concerns**.

Sounds like HOC(High-Order Components), right?

>A higher-order component is a function that takes a component and returns a new component.

```javascript
import React, { Component } from 'react';

function Wrapper(COM, data) {
  return class extends Component{
    render() {
      return (<COM data={data}></COM>)
    }
  }
}
class Basic extends Component {
  render() {
    return (<div><h1>{this.props.data}</h1></div>);
  }
}
const Wrapped = Wrapper(Basic, "123");
```

**Let's imagine what if we use Render Props with HOC would happen.** 
**Right, it's like openning a window to a new world!**

```javascript
import React, { Component } from 'react';

function newWorld(Com) {
  return class extends Component {
    constructor(props) {
      super(props);
      //cross-cutting concerns
    }
    
    //......
    
    render() {
      //......
      return (
        //using render props to display the "Com"
        <Child render={data => (
          <Com {...this.props} data={data}/>
        )}/>
      );
    }
  }
}
```

Libraries that use render props include React Router and Downshift.



