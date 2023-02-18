---
id: 366
title: Tagged Template Literals
#date: 2018-08-03T17:07:11+00:00
author: Luhao
layout: post

categories:
  - Frontend
tags:
  - javascript
---

I didn&#8217;t notice that the back quote&#8217;s meaning in the styled-components until today! I have been using styled-components for a long time, and I thought it was Babel somehow to transform the code segment. Today, I finally read that article that explained the magic behind styled-components when I was going through the document online.

No more nonsense, let&#8217;s get into our gist.

This is a common pattern of styled-components.

<pre><code class="language-javascript ">const Button = styled.button`
  background-color: papayawhip;
  border-radius: 3px;
  color: palevioletred;
`
</code></pre>

Template literals are enclosed by the back-tick (&#96; &#96;) character instead of double or single quotes. Template literals can contain placeholders. These are indicated by the dollar sign and curly braces (${expression}).

<pre><code class="language-javascript ">let name = 'Tom';
console.log(`This is ${name}.`);
//output:
//This is Tom.
</code></pre>

A more advanced form of template literals are tagged templates. Tags allow you to parse template literals with a function.

The **first** argument of a tag function contains an array of string values. The **remaining** arguments are related to the expressions.

<pre><code class="language-javascript ">let func = (strs, ...args) =&gt; {console.log(strs);console.log(args);};
func`This is ${name}. How are you?`

// output :
[ 'This is ', '. How are you?' ]  
[ 'Tom' ]
</code></pre>

But if we call this function as a normal way,

<pre><code class="language-javascript ">func(`This is ${name}. How are you?`);

// output :
["This is Tom. How are you?"]
[]
</code></pre>

So we only get the first parameter as a string.

## How the magic happens?

Let&#8217;s craft a function.

<pre><code class="language-javascript ">let exec = (...args) =&gt; args[1](args[0][0]);
let f = str =&gt; console.log(str);
exec`hello${f}`;
//output:
//hello
</code></pre>

please note the first parameter is an **Array**!

Do you get it?

We can pass a function as a template string into the tagged expression.

This is called **Tagged Template Literals**.

In the end,

<pre><code class="language-javascript ">const Button = styled.button`
  font-size: ${props =&gt; props.primary ? '2em' : '1em'};
`
</code></pre>

will render:

<pre><code class="">// font-size: 2em;
&lt;Button primary /&gt;

// font-size: 1em;
&lt;Button /&gt;
</code></pre>

Let&#8217;s a more complex example.

<pre><code class="language-javascript ">const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) =&gt; {
  acc[label] = (...args) =&gt; css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

const Content = styled.div`
  height: 3em;
  width: 3em;
  background: papayawhip;

  /* Now we have our methods on media and can use them instead of raw queries */
  ${media.desktop`background: dodgerblue;`}
  ${media.tablet`background: mediumseagreen;`}
  ${media.phone`background: palevioletred;`}
`;

render(
  &lt;Content /&gt;
);
</code></pre>

Let&#8217;s translate it line by line.

<pre><code class="language-javascript ">//the variable size would become this:
const sizesEquivalent = {
  desktop: (...args) =&gt; css`
  @media (max-width: 62em) {
    ${css(...args)}
  }
`
,
  tablet: (...args) =&gt; css`
  @media (max-width: 48em) {
    ${css(...args)}
  }
`
,
  phone: (...args) =&gt; css`
  @media (max-width: 36em) {
    ${css(...args)}
  }
`
}
</code></pre>

And what the hell is **_css_** function?

> A helper function to generate CSS from atemplate literal with interpolations.

You need to use this if you return a template literal with interpolations **inside an interpolation**.

It returns an array of interpolations,

which is a flattened data structure that you can pass as an interpolation itself.

<pre><code class="language-javascript ">console.log(css`color: green;`)
console.log(css`color: ${props =&gt; props.color};`)

//["color: green;"]
//["color: ", props =&gt; props.color, ";"]
</code></pre>

As you can see, if you pass a plain string as a parameter into the function, **_css_** just return the plain string in an Array. If you do like tagged template, it will return a array just like we analyzed before.

So, in a conclusion, we would have our component like this:

<pre><code class="language-javascript ">const ContentEquvalent = styled.div`
  height: 3em;
  width: 3em;
  background: papayawhip;
  @media (max-width: 62em) {
    background: dodgerblue;
  }
  @media (max-width: 48em) {
    background: mediumseagreen;
  }
  @media (max-width: 36em) {
    background: palevioletred;
  }
`;
</code></pre>

---

[magic behind styled-components](https://mxstbr.blog/2016/11/styled-components-magic-explained/)
