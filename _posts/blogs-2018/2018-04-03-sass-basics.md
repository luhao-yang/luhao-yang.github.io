---
id: 266
title: Sass basics
#date: 2018-04-03T16:29:37+00:00
author: Luhao
summary: Basic usages and syntaxes of Sass
layout: post
#guid: http://flywithfan.net/?p=266
#permalink: /web/266/
categories:
  - Frontend
tags:
  - css
---
Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.
  
Sass lets you use features that don&#8217;t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.
  
Once Sass is installed, you can compile your Sass to CSS using the sass command. You&#8217;ll need to tell Sass which file to build from, and where to output CSS to.
  
For example, running `sass input.scss output.css` from your terminal would take a single Sass file, `input.scss`, and compile that file to `output.css`.

## Features

  1. Fully CSS-compatible
  2. Language extensions such as variables, nesting, and mixins
  3. Many useful functions for manipulating colors and other values
  4. Advanced features like control directives for libraries
  5. Well-formatted, customizable output

## Syntax

There are two syntaxes available for Sass.

  1. scss, an extension of the syntax of CSS
  2. sass, using indentation rather than brackets to indicate nesting of selectors, and newlines rather than semicolons to separate properties

## Basic usage

Here we use take scss for example, which is very much like css.

### Referencing Parent Selectors: &

You can explicitly specify where the parent selector should be inserted using the & character

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
}
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
 }
</code></pre>

### Variables

Sass uses the $ symbol to make something a variable

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">$primary-color: #333;
body {
    color: $primary-color;
}
</code></pre>

### Interpolation: #{}

You can also use SassScript variables in selectors and property names using #{} interpolation syntax:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">p.foo {
  border-color: blue; }
</code></pre>

### Nesting

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li { display: inline-block; }
}
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li {
  display: inline-block;
}
</code></pre>

### Partials

**purpose:**
  
You can create partial Sass files that contain little snippets of CSS that you can include in other Sass files. This is a great way to modularize your CSS and help keep things easier to maintain.

**format:**
  
A partial is simply a Sass file named with **a leading underscore**. You might name it something like _partial.scss

**how-to-use:**
  
The underscore lets Sass know that the file is only a partial file and that it should not be generated into a CSS file. Sass partials are used with the `@import` directive.

### Import

problem with import of original CSS:

> Each time you use @import in CSS it creates another HTTP request 

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">//_button.scss
button {
    background-color: rgb(112, 222, 255);    
}
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">//App.scss
@import 'button';

/* ... */
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">button {
  background-color: #70deff; }
</code></pre>

### Mixins

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">.box {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
</code></pre>

### Extend/Inheritance

Using @extend lets you share a set of CSS properties from one selector to another.
  
A placeholder class is a special type of class that only prints when it is extended, and can help keep your compiled CSS neat and clean.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

// This CSS will print because %message-shared is extended.
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">.message, .success {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333; }

.success {
  border-color: green; }
</code></pre>

The magic happens in the generated CSS, where each of these classes will get the same CSS properties as %message-shared. This helps you avoid having to write **multiple class names** on HTML elements.

### Operators

Sass has a handful of standard math operators like +, -, *, /, and %.

### Comments: /\* \*/ and //

Sass supports standard multiline CSS comments with /\* \*/, as well as single-line comments with //. The multiline comments are **preserved** in the CSS output where possible, while the single-line comments are **removed**.

&#8212;

## Control Directives & Expressions

### @if

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">p {
  @if 1 + 1 == 2 { border: 1px solid;  }
  @if 5 &lt; 3      { border: 2px dotted; }
  @if null       { border: 3px double; }
}

$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">p {
  border: 1px solid; }


p {
  color: green; }
</code></pre>

### @for

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
</code></pre>

### @each

The @each directive usually has the form @each $var in \<list or map>.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
</code></pre>

### @while

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">$i: 6;
@while $i &gt; 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">.item-6 {
  width: 12em; }

.item-4 {
  width: 8em; }

.item-2 {
  width: 4em; }
</code></pre>

## Built-in Functions

[functions](https://sass-lang.com/documentation/Sass/Script/Functions.html)

## Function Directives

It is possible to define your own functions in sass and use them in any value or script context.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
</code></pre>

is compiled to

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-css">#sidebar {
  width: 240px; }
</code></pre>

## @extend vs. @include

  1. `@mixin` can take parameters which acts like a function.
  2. `@extend` can&#8217;t not be used in @media directive.
  3. `@mixin` do not merge selector, while `@extend` does.

From my point of view, unless some components is surely the parent and child relationship, you should use `@mixin` instead of `@extend` in most cases.

Take bootstrap 4.0,0 for example, by searching &#8216;extend&#8217; from the source code, you can only find **16 matches across 6 files**. However, you should find **204 matches across 51 files** when you search &#8216;include&#8217;.

* * *

reference:
  
1. [sass](https://sass-lang.com/guide)