---
layout: post
title: "Using bash $() in npm command"
featured-img: bash-npm
categories: 
  - Misc
tags:
  - bash
  - npm
---

Just want to note down what I found out to run bash command in npm script.

# Problem

Suppose we have a demand to use `cross-env` to set environment variables `hash` before running `jest`, so you added this content to `package.json`.

```
{
  // ...
  "scripts": {
      "test": "cross-env hash=$(git rev-parse --short HEAD) && jest",
  },
  //...
}

```
**This actually works in Linux but not in Windows(powershell/cmd/MinGW)!**

if you run `npm test` What you'll likely get is this error:

```
> cross-env hash=$(git rev-parse --short HEAD) && jest

'rev-parse' is not recognized as an internal or external command,
operable program or batch file.
node:events:491
      throw er; // Unhandled 'error' event
      ^

Error: spawn rev-parse ENOENT
...
```

I spent a lot of time to search online but no luck at all. I tried to add double quote/single quote/back quote but none of are ideal.

**Double quote works for Windows but ended up with emitting an error in Linux!**

```
{
  "scripts": {  
      "test": "cross-env hash=$(\"git rev-parse --short HEAD\") && jest",
  },
}

```

# Takeaway

Finally I figured a way out after spending a long time, so I want to share and also remind myself in case I forgot.


```
{
  "scripts": {
      "test": "sh -c \"cross-env hash=$(git rev-parse --short HEAD)\" && jest",
  },
}

```

This works both in Windows and Linux! You are welcome.


BTW, also want to share a bash cheat sheet where you can learn a lot of bash tricks https://devhints.io/bash


