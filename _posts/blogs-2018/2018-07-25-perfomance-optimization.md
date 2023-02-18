---
id: 329
title: Perfomance Optimization for Frontend
#date: 2018-07-25T07:52:25+00:00
author: Luhao
summary: Some techniques of optimising performance in web development
layout: post

categories:
  - Frontend
tags:
  - design
---

## Content

- reducing HTTP request: merge files, Css sprite, inline image
- reducing DNS lookup: DNS cache, appropriate resource distribution
- avoiding redirecting：get rid of unnecessary jump
- Ajax caching
- lazy loading
- preloading
- reducing DOM nodes
- putting resources under different domains
- reducing iframes

## Server

- CDN
- reponse header: Expires, Cache-Control
- gzip compression
- ETag configuration: it is an identifier for a specific version of a resource, web server does not need to send a full response if the content has not changed
- Flush Buffer Early: sends a partial HTML response to the browser to start fetching components and rendering the response while the backend can continue creating the rest of the HTML page.
- Ajax using GET for requesting
- avoiding empty src of img tag

## Cookie

- limiting the size of cookie
- no cookie when introducing resources

## CSS

- putting style sheet at the top
- no CSS expressions
- no Filter of IE

## JavaScript

- puting script at the bottom
- loading javascript, css from other files
- compressed javascript and css
- deleting unnecessary scripts
- reducing DOM munipulations
- well-designed event listening and capturing 合理设计事件监听器

## Image

- optimized images
- css sprite
- no stretching image in HTML
- small favicon.ico and caching

## mobile

- components smaller than 25k
- Pack Components into a Multipart Document

## coding

- hash-table for searching
- less global variables
- reducing DOM munipulations
- using setTimeout for avoiding stuck
- caching result of DOM searching
- avoiding CSS Expression
- avoiding with in javascript
- merging variable declarations
- avoiding empty src of image and iframe (empty src leads reloading the page)
- avoiding style attributes in HTML

## performance evaluation tools

- PageSpeed
- YSlow

---

1.[性能优化](https://github.com/poetries/FE-Interview-Questions/blob/master/performance-optimization.md)
