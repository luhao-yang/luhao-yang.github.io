---
id: 375
title: JavaScript Testing Review
#date: 2018-08-06T11:33:38+00:00
author: Luhao
layout: post

image: /wp-content/uploads/2018/08/1_xZURv-fdC3H8Lv7p6vd1Qw-150x150.jpeg
categories:
  - Testing
tags:
  - javascript
  - testing
---

I&#8217;d like to come back to where we can re-discuss about JavaScript testing, since unit test, tdd and bdd are so popular among us developers. I believe most developers once ran into a situation where we spent more time on testing than developing component itself. I should say no testing is painless. Last week, I got an interview asking me what to test during development. It provokes me thinking this question, and more further to how to mitigate this pain and what is important in tesing.

You created a component, what&#8217;s next? From my point of view, there are some aspects of testing we should pay the attention to.

- inputs and outputs
- appearance
- behavior
- context
- side effects

Take React testing for example, with testing tools [jest](https://jestjs.io/en/), [enzyme](http://airbnb.io/enzyme/), react-test-renderer. Let&#8217;s create a component named Autocomplete. Here I just show the key parf of my code below:

[./components/Autocomplete.js](http://flywithfan.net/wp-content/uploads/2018/08/Autocomplete.js)

<pre><code class="language-javascript ">//...
const addr = "http://localhost:3001/";

export default class extends React.Component {
  state = {
    //...
  };

  cbHandler(item) {
    //setState with setTimeout, because it's called in children
  }

  componentDidMount() {
    console.log('componentDidMount')
    //fetch ...
  }

  inputHandler(event) {
    let value = event.target.value;
    //... fetch
  }

  keypressHandler(event) {
    if (event.charCode === 13) {
      //... fetch
    }
  }

  render() {
    return (
      &lt;StyledComp&gt;
        &lt;input
          type="text"
          value={this.state.value}
          onInput={this.inputHandler.bind(this)}
          onKeyPress={this.keypressHandler.bind(this)}
        /&gt;
        &lt;Suggestions data={this.state.data} cb={this.cbHandler.bind(this)} /&gt;
      &lt;/StyledComp&gt;
    );
  }
}
</code></pre>

[./components/Suggestions.js](http://flywithfan.net/wp-content/uploads/2018/08/Suggestions.js)

<pre><code class="language-javascript ">//...

export default class extends React.Component {
  clickHandler(item) {
    console.log("clickHandler");
    this.props.cb(item);
  }

  render() {
    const { data } = this.props;
    return (
        //...
        &lt;ul&gt;
          {data
            ? data.map(e =&gt; {
                return (
                  &lt;li key={e.id} onClick={this.clickHandler.bind(this, e)}&gt;
                    {e.name}
                  &lt;/li&gt;
                );
              })
            : ""}
        &lt;/ul&gt;
    );
  }
}
</code></pre>

---

## Writing Test suite

**./components/\_\_test\_\_/AutoComp.test.js**

**testing appearance with jest snapshot**:

<pre><code class="language-javascript "> describe("Autocomplete appearance", () =&gt; {

  it("renders correctly", () =&gt; {
    const tree = renderer.create(&lt;Autocomplete /&gt;).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
</code></pre>

it will output a .snap file for us, **./components/\_\_test\_\_/\_\_snapshots/AutoComp.test.js.snap**

So, every time you call **_expect(tree).toMatchSnapshot();_** you want to compare the looks of the rendering component with the snapshot in this file.

**testing behavior with enzyme**

<pre><code class="language-javascript ">describe("Autocomplete behavior", () =&gt; {
  it("behave correctly", () =&gt; {
    const w = mount(&lt;Autocomplete /&gt;);
    expect(w.find("input")).toHaveLength(1);

    w.find("input").simulate("input", { target: { value: "abc" } });
    expect(w.state("value")).toEqual("abc");
  });
});
</code></pre>

We should avoid testing with context, but if we can&#8217;t, just construct one!

If you using Redux to manage your shared states, [redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store) is certainly a good choice!

dealing with side effects, like networking **_fetch_**.

To simplify, we can write a function to fake **_fetch_** by using **_jest.fn_**, which helps us to spy function call on parameters, results and so on.

<pre><code class="language-javascript ">&lt;br />global.fetch = jest.fn(url =&gt; {
    let resp = {
        ...
    };
  //Promise.resolve({ blob: blob =&gt; resp })
  return Promise.resolve({ json: json =&gt; resp });
});

</code></pre>

Also, if you don&#8217;t want to write this, you could turn to [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock), which allows you to easily mock your fetch calls and return the response you need to fake the HTTP requests.

To install, **npm install &#8211;save-dev jest-fetch-mock**

Then add **global.fetch = require(&#8216;jest-fetch-mock&#8217;)**

to **_rootDir/setupTests.js_** to setup the fetch API on global context.

Use **fetch.mockResponse(body, init)** to mock http reponse.

remember to reset after a mocking, **fetch.resetMocks();**

### JSON Server

Lastly, if you wanna test real requesting, I recommend to use [JSON Server](https://github.com/typicode/json-server) for testing REST API, with which you can get http response in JSON format.

> Get a full fake REST API with zero coding in less than 30 seconds

<pre><code class="">GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
</code></pre>

After installation, start like this:

`json-server -w db.json`

But here I want to fake massive outputs, so I use a js file to generate outputs, and then start using this command:

`json-server -p 3001 -w data.js`

After launch, there should be output like this:

<pre><code class="">Resources
  http://localhost:3001/users
  http://localhost:3001/meta

  Home
  http://localhost:3001

</code></pre>
