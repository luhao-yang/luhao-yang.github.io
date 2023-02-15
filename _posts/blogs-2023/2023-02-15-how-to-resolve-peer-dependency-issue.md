---
layout: post
title: "How to resolve peer dependency issue in npm"
featured-img: npm
categories: 
  - Frontend
tags:
  - npm
---

# Background

Recently I have been dealing with upgrading and tidy-ups against my team's frontend project. Among them one of the tricky problem is to tackle the peer dependency issue which we had for a long time and we were just too lazy to resolve it. OK, to save the nonsense, Let's get straight into it. 

# How does the issue happen

Well there is well-explained blog in nodejs.org so I'm not gonna repeat and ramble about it(https://nodejs.org/es/blog/npm/peer-dependencies/). 

*Dependencies*: Libraries or modules that an NPM module needs in order to work in production.

*peerDependencies*: A peer dependency is a specific version or set of versions of a third-party software library that a module is designed to work with. They're similar in concept to the relationship between a browser extension and a browser. 


One important note is:

>UPDATE: npm versions 1, 2, and 7 will automatically install peerDependencies if they are not explicitly depended upon higher in the dependency tree. For npm versions 3 through 6, you will receive a warning that the peerDependency is not installed instead.

And from npm 7, you will get a warning if saying that you have peer dependency conflict which stops you from installing or even uninstalling completely. That is annoying but I can totally understand that npm do not want to take the responsibility to taking care of dependency conflicts nor it can. So it's really just pushing back to developers to solve it in their project.


# Ways to ignore
You can simply ignore the issue by adding `--legacy-peer-deps` to the `npm install` command.
The idea behind of it is that When the --legacy-peer-deps flag is set, ignore peerDependencies entirely. This makes npm v7 behave effectively the same as npm v3 through v6. 


Along with `--legacy-peer-deps`, you can also use `--force` to make npm continue, which uses heuristics method for dependencies, but not for the root project.



This is a detailed explanation about how npm addresses peer conflicts.
https://github.com/npm/rfcs/blob/main/implemented/0031-handling-peer-conflicts.md



# Some useful npm commands

```shell
npm list

npm view <package-name>

npm info <package-name> peerDependencies
```

there are some useful npm packages to do the checks as well. Like this one https://www.npmjs.com/package/check-peer-dependencies

it gives you a nice summary of your peer dependency information and potentially find out the solution for you. 


https://www.npmjs.com/package/check-peer-dependencies


Make sure you have tried to refresh you `package-lock.json` at least once. So do as the following does.

```
rm package-lock.json
rm -rf node_module
npm install
```

Yes you will see the annoying peer dependency conflict message again but you will have a cleaner view of the logs and rule out some glitch just in case.


# Resolve the issue fundamentally

So if you want resolve the issue completely from deep down you must well manage your dependencies and reconcile the conflicts.

My suggestion is that be vigilant to upgrade your dependency a major version and do a lot of investigation around its eco-system before taking up the upgrade.

For example, you want to upgrade you React project from v16 to v17. Not only you need to read the official guide about the breaking changes and migration guidance, you also need to go through your dependencies very carefully to see if they have newer version to support React 17, things like any 3rd party React component, React testing libs and bundlers etc. If they don't have support for it, you should reconsider the upgrades.

### hacky tricks
At last, I just want to mention one hacky way to work around the issue which is manually editing the `peerDependencies` of a module in `package-lock.json`. Of course it's not a good practice at all but it works. It is sort of fooling npm to believe there is no peer dependency conflict issue, no real difference to ignore it by adding `--legacy-peer-deps`.


























