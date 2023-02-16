---
layout: post
title: "A recap of JavaScript module format"
summary: "JavaScript has so many module formats due to historical reasons and that really confuses people for a long time"
featured-img: js-cover
categories: 
  - Frontend
tags:
  - javascript
---

Here is just a recap of JavaScript module formats about what they are and what they do. As a veteran of js developer I even feel struggling to reconcile the different formats between projects and libraries, across the browser and node environment.


# CommonJS

- Implemented by Nodejs
- Synchronous
- always load the whole object 
  
```javascript

// import a module
const package = require('module-name')

// export a module
exports.a = 1
exports.b = 2

//or

module.exports = {
  a: 1,
  b: 2
}

```

Node suggests js file extension to indicate which module the source file is using by naming `.cjs` or `.mjs`. Alternative, you can specify `type: module` in `package.json`.

# ES Module

- Used for both server/client side
- Runtime/static loading of modules supported
- Static analyzing 
- Tree shakeable

`.mjs` helps identify it's ES module script. `<script type="module">` in the browser. However it's not fully supported across all the browsers.

```javascript
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { default as alias } from "module-name";
import { export1, export2 } from "module-name";
import { export1, export2 as alias2, /* … */ } from "module-name";
import { "string name" as alias } from "module-name";
import defaultExport, { export1, /* … */ } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

# AMD

- implemented by RequireJs
- used in browser environment
- Asynchronous

RequireJs was popular for a time, that is because there is no ES6 and in old times javascript doesn't even have a module concept. So Commonjs and AMD were invented to solve this problem.

```javascript
// define a module
define({
    color: "black",
    size: "unisize"
});

// a module with dependencies
define(["./cart", "./inventory"], function(cart, inventory) {
        //return an object to define the "my/shirt" module.
        return {
            color: "blue",
            size: "large",
            addToCart: function() {
                inventory.decrement(this);
                cart.add(this);
            }
        }
    }
);

```

# UMD
UMD stands for "Universal Module Definition"

- Combination of CommonJs + AMD
- UMD essentially creates a way to use either of the two, while also supporting the global variable definition.
- works both in client and server


```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'b'], function (exports, b) {
            factory((root.commonJsStrictGlobal = exports), b);
        });
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('b'));
    } else {
        // Browser globals
        factory((root.commonJsStrictGlobal = {}), root.b);
    }
}(typeof self !== 'undefined' ? self : this, function (exports, b) {
    // Use b in some fashion.

    // attach properties to the exports object to define
    // the exported module properties.
    exports.action = function () {};
}));
```

check out all the templates here https://github.com/umdjs/umd/tree/master/templates

# IIFE 
An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. 

- Avoid polluting the global namespace
- Execute an async function
- The module pattern (leveraging closure)

```javascript
(function () {
  // …
})();

(() => {
  // …
})();

(async () => {
  // …
})();

```

# SystemJs

>SystemJS is a hookable, standards-based module loader.

**You only want to use SystemJs when you would like to use in-browser JavaScript modules.**

- [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
- load multiple modules with just one request
- introspection of module registry
- `import.meta.resolve` and `import.meta.url`
- support other kinds of modules other than JS module(e.g JSON, CSS, WASM)

here is the introduction video of SystemJs https://www.youtube.com/watch?v=AmdKF2UhFzw&ab_channel=JoelDenning

# Ship ESM & CJS in one Package 

Just do as follows in your `package.json`
```
{
  "name": "my-cool-package",
  "exports": {
    ".": {
      "require": "./index.cjs", // CJS
      "import": "./index.mjs" // ESM
    }
  }
}
```

Some references:
https://antfu.me/posts/publish-esm-and-cjs
https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html
https://medium.com/swlh/npm-new-package-json-exports-field-1a7d1f489ccf
