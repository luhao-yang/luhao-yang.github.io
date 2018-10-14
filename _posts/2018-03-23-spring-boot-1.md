---
id: 220
title: 'Spring Boot (1) &#8211; Trial'
#date: 2018-03-23T14:29:13+00:00
author: Luhao
summary: "Spring boot first trial... Let's go"
layout: post
#guid: http://flywithfan.net/?p=220
#permalink: /web/220/
categories:
  - Java
  - Web
tags:
  - spring
---
## What is Spring Boot

Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can &#8220;just run&#8221;. We take an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need very little Spring configuration.

> Takes an opinionated view of building production-ready Spring applications. Spring Boot favors convention over configuration and is designed to get you up and running as quickly as possible. 

### Features

  * Create stand-alone Spring applications
  * Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)
  * Provide opinionated &#8216;starter&#8217; POMs to simplify your Maven configuration
  * Automatically configure Spring whenever possible
  * Provide production-ready features such as metrics, health checks and externalized configuration
  * Absolutely no code generation and no requirement for XML configuration

Just put them into maven pom.xml then we can start with our project.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-xml">&lt;parent&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
    &lt;version&gt;2.0.0.RELEASE&lt;/version&gt;
&lt;/parent&gt;
&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;
</code></pre>

## Let&#8217;s go

Alternatively, I would go with [spring initializer](http://start.spring.io/) to create a out-of-box project immediately.

![](/assets/img/uploads/2018/Screen-Shot-2018-03-23-at-10.01.06.png)

It&#8217;s great to choose some starter projects, such as WEB, JPA, devtools etc. After downloading the zip file, just import it into IDE, Eclipse or Intellij IDEA which I personally choose.

Then let&#8217;s take a look at project structure.

![](/assets/img/uploads/2018/codestructure.png)

**/src/main/java**: java sources, including these blow

&emsp; **StudyApplication**: gl.obal framework configuration, main entry

&emsp; **controller**: the &#8220;C&#8221; in MVC, request mapping and reponse organization

&emsp; **dao**: short for Data Access Object, responsible for data retrieving, storage, reorganization

&emsp; **entity**: data entity, the model, &#8220;M&#8221; in MVC. Some may differentiate model between entity, model could be a combination of entities.

&emsp; **service**: implemention of the business logic

&emsp; **util**: various of utilities, tools

&emsp; **consts**: constants of projects

**/src/main/resources:**

&emsp; **static**: static files, visit directly by url, which means the request will not be delivered into DispatchServelet

&emsp; **templtaes**: template files to be rendered by server, freemarker, thymeleaf etc. Spring recommends to use thymeleaf for SSR, so I would try to use it.

There is another code structure that should be mentioned, which is based on components. See this below:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">com
 +- example
     +- myapplication
         +- Application.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
</code></pre>

Anyway, it&#8217;s your choice. The last thing, Write controller, then run.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">@RestController
public class HelloWorldController {
    @RequestMapping("/hello")
    public String index() {
        return "Hello World";
    }
}
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">//if you don't need datasource configuration, just add this or you will get a error
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class StudyApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudyApplication.class, args);
    }
}
</code></pre>

RestController annotation will return json so that you don&#8217;t have to use jackson.

open browser, visit http://localhost:8080/hello, then you will see **Hello World**

If you need hot reload, remember to add devtools to dependencies

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-devtools&lt;/artifactId&gt;
    &lt;optional&gt;true&lt;/optional&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;
</code></pre>

Edit a java file, save, then it will run! Enjoy!

Here is the official [spring boot reference](https://docs.spring.io/spring-boot/docs/current/reference/html/) which is very detailed and elaborate.