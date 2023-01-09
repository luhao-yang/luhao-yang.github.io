---
id: 207
title: Thymeleaf
#date: 2018-03-16T01:13:02+00:00
author: Luhao
summary: Thymeleaf is a modern server-side Java template engine for both web and standalone environments.
layout: post
#guid: http://flywithfan.net/?p=207
#permalink: /web/207/
categories:
  - Web
tags:
  - template
---
> Thymeleaf is a modern server-side Java template engine for both web and standalone environments. 

Thymeleaf&#8217;s main goal is to bring elegant **natural** templates to your development workflow — HTML that can be **correctly** displayed in browsers and also work as static prototypes, allowing for stronger collaboration in development teams. As you can see, thymeleaf using dialect to render pages would not be analyzed by browsers because browsers don&#8217;t recognize those tags.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;table&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th th:text="#{msgs.headers.name}"&gt;Name&lt;/th&gt;
      &lt;th th:text="#{msgs.headers.price}"&gt;Price&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr th:each="prod: ${allProducts}"&gt;
      &lt;td th:text="${prod.name}"&gt;Oranges&lt;/td&gt;
      &lt;td th:text="${#numbers.formatDecimal(prod.price, 1, 2)}"&gt;0.99&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
</code></pre>

## Using with Spring MVC

There are two interfaces in Spring MVC that conform the core of its templating system:

**org.springframework.web.servlet.View**

Views model pages in our applications and allow us to modify and predefine their behaviour by defining them as beans. Views are in charge of rendering the actual HTML interface, usually by the execution of some template engine like Thymeleaf.

**org.springframework.web.servlet.ViewResolver**

ViewResolvers are the objects in charge of obtaining View objects for a specific operation and locale. Typically, controllers ask ViewResolvers to forward to a view with a specific name (a String returned by the controller method), and then all the view resolvers in the application execute in ordered chain until one of them is able to resolve that view, in which case a View object is returned and control is passed to it for the renderization of HTML.

These two classes will be in charge of processing Thymeleaf templates as a result of the execution of controllers.

onfiguration of the Thymeleaf View Resolver is very similar to that of JSP:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">@Bean
public ThymeleafViewResolver viewResolver(){
    ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
    viewResolver.setTemplateEngine(templateEngine());
    // NOTE 'order' and 'viewNames' are optional
    viewResolver.setOrder(1);
    viewResolver.setViewNames(new String[] {".html", ".xhtml"});
    return viewResolver;
}
</code></pre>

in xml:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-xml">&lt;bean class="org.thymeleaf.spring4.view.ThymeleafViewResolver"&gt;
  &lt;property name="templateEngine" ref="templateEngine" /&gt;
  &lt;!-- NOTE 'order' and 'viewNames' are optional --&gt;
  &lt;property name="order" value="1" /&gt;
  &lt;property name="viewNames" value="*.html,*.xhtml" /&gt;
&lt;/bean&gt;
</code></pre>

What&#8217;s good is that: you can add to **spring-boot-starter-thymeleaf** dependency property, which is very conveninent for out-of-box using.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">    &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-thymeleaf&lt;/artifactId&gt;
            &lt;version&gt;2.0.0.RELEASE&lt;/version&gt;
    &lt;/dependency&gt;
</code></pre>

One more thing&#8230;

remember to cancel cache setting to **application.properties** or you would have to reboot for updating thymeleaf templates.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">spring.thymeleaf.cache=false
</code></pre>

see more defails: [hymeleaf + Spring](http://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html)