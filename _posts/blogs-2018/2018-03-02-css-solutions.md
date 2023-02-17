---
id: 195
title: CSS solutions
#date: 2018-03-02T11:52:39+00:00
author: Luhao
summary: Confronting with a bunch of CSS solutions, what should beginners to chose?
layout: post
#guid: http://flywithfan.net/?p=195
#permalink: /web/195/
categories:
  - Frontend
tags:
  - css
---
![](/assets/img/uploads/2018/WechatIMG4.jpeg)

Here is a guide of how to choose styling solutions for react,
  
[how-to-style-react](https://www.javascriptstuff.com/how-to-style-react/),
  
I extract some essentials from this post and give out my suggestions.

  1. Methodologies 
    I&#8217;d like to use BEM to name compoments, elements, and specification stylings. Althought there&#8217;s no more need of namespace to avoid global naming contanmination with various of modern tools, it&#8217;s supremely easy identifying styles and understanding the meaning behind them.
    
    On top of that, I am inclined to apply SMACSS to my projects, which encourage us to sperate css rules into more specific categories. They are **basic rules, layout rules, modules, state rules, theme rules**. Each of them has its own meaning in rendering pages.
    
    With the development of mobile web, we should design responsive web applicatons through device test abilities like media query, [responsive-web-design](http://alistapart.com/article/responsive-web-design).

  2. Preprocessors
    
    Less, SASS in definetly the best two choices in my esys, and read a comparison post here [less-vs-sass](https://blog.udemy.com/less-vs-sass/).
  
    Jss in maybe a good alternative in react development, but it&#8217;s not very suitble for Vue and other framework, so I encourage a beginner to go with Less or SCSS which would a fault-proof way.

  3. PostProcessors
    
    PostCSS, that would be the only one I recommended. It has many plugins to accomplish various of tasks.
    
    > PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more. 

  4. Inline Style Helpers 
    Forget it, it&#8217;s out of style，OK？