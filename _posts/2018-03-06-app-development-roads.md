---
id: 197
title: App development roads
#date: 2018-03-06T21:39:20+00:00
author: Luhao
summary: "There are some popular app development roads on the table. Let's take a look."
layout: post
#guid: http://flywithfan.net/?p=197
#permalink: /architecture/197/
categories:
  - Web
---
### 1. Native App

Based on the specific platform, normally are iOS and Android, using Objective-C and Java respectively.

pros:
  
&#8211; high performance
  
&#8211; built-in tools
  
&#8211; richness APIs

cons:
  
&#8211; high cost of development
  
&#8211; none cross-platform
  
&#8211; inflexible

### 2. Web App

Developing a SPA(Single Page Application) running in mobile browser is easy to implement, and it&#8217;s totally cross platform, because it&#8217;s based on browser.

pros:
  
&#8211; free-installation
  
&#8211; cross platform
  
&#8211; HTML, CSS, JS
  
&#8211; agile and light

cons:
  
&#8211; rely on network
  
&#8211; severely limited APIs
  
&#8211; compartively bad user experience
  
&#8211; browser as entry

### 3. Hybird App

Part-of Native, part-of Web. Some fundmental functionalties and APIs provided by Native libraries are encapsulated for invoking by javascript. Main UI and logics are implemented by HTML and js, of course, which is running in the WebView.

PhoneGap, [**Cordova**](https://cordova.apache.org/) may be the most popular framework of this kind of solution.

pros:
  
&#8211; web-like UI
  
&#8211; cross platform
  
&#8211; agile and light
  
&#8211; approximately native APIs

cons:
  
&#8211; bad performance(compared with Native App)
  
&#8211; tricky with some APIs
  
&#8211; potential pitfalls

### 4. React Native

It&#8217;s a a different philosophy compared to Hybird, “Learn once, write anywhere” differs from the usual cross-platform mantra, “Write once, run anywhere.”

[**React Native**](https://facebook.github.io/react-native/) provides a way to write javascript and links the react components to the native views. In other words, make native app with javascript!

pros:
  
&#8211; more native look and feel
  
&#8211; better performance(compared with cordova)
  
&#8211; agile and easy(compared with Native App)
  
&#8211; extensive and accessible Native features

cons:
  
&#8211; bad performance(compared with Native App)
  
&#8211; a bit harder for beginners
  
&#8211; potential pitfalls

### 5. Weex App

[**Weex**](http://weex.apache.org/) is the alternative choice for React Native, also with the skyrocketing spread and development of Vue.js, Weex is born to replace React Native, mainly because it has loads of chinese fans and supported by alibaba, a giant tech company.

It seems weex&#8217;s community and document is a little bit inferior to React Native, mostly because it is born later but getting better now.

* * *

LINKS:

[reactnative vs. cordova](https://www.toptal.com/mobile/comparing-react-native-to-cordova)
  
[HYBRID VS NATIVE MOBILE APPS](https://ymedialabs.com/hybrid-vs-native-mobile-apps-the-answer-is-clear/)