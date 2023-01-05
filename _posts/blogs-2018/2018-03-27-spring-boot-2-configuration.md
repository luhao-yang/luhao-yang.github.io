---
id: 241
title: 'Spring Boot (2) &#8211; Configuration'
#date: 2018-03-27T17:57:11+00:00
author: Luhao
layout: post
#guid: http://flywithfan.net/?p=241
#permalink: /java/241/
categories:
  - Java
tags:
  - spring
---
At last episode, we have a peek at the spring boot project. We knew the spring boot philosophy &#8220;convention over configuration&#8221;, but we still need to grasp the spring application configuration, remember some important and common configs, in case of changing the default value at some time.

First of all, application.properties is located in src/main/java/resources by default.

## define customized value

application.properties

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">net.flywithfan.helloMsg = "hello, I am from China."
</code></pre>

To inject value by using **_Value_** annotation

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">@RestController
public class HelloController {

    @Value("${net.flywithfan.helloMsg}")
    private String helloMsg;

    @RequestMapping("/hello")
    public String hello() {
        return helloMsg;
    }

}
</code></pre>

Open url http://localhost:8080/hello, displays:

**_Hello, I am from China._**

## define configuration bean

sometimes, we have a lot properties that ought to be injected, so it&#8217;s convenient to define a bean for this specific task. To do that, use **_ConfigurationProperties_** annotation,

application.properties

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">net.flywithfan.helloMsg=Hello, I am from China.
net.flywithfan.owner=Luhao Yang
net.flywithfan.slogan=Stay hungry Stay foolish
</code></pre>

GlobalConfig.java

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">@Component
@ConfigurationProperties(prefix="net.flywithfan")
public class GlobalConfig {
    private String type;
    private String owner;
    private String slogan;

    //getters and setters ...

    @Override
    public String toString() {
        return "GlobalConfig{" +
                "type='" + type + '\'' +
                ", owner='" + owner + '\'' +
                ", slogan='" + slogan + '\'' +
                '}';
    }
}
</code></pre>

HelloController.java

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">    @Autowired
    private GlobalConfig gc;

    @RequestMapping("/info")
    public String info() {
        return gc.toString();
    }
</code></pre>

Open url http://localhost:8080/info, displays:

**_GlobalConfig{type=&#8217;Personal Blog&#8217;, owner=&#8217;Luhao Yang&#8217;, slogan=&#8217;Stay hungry Stay foolish&#8217;}_**

## Configuring Random Values

The RandomValuePropertySource is useful for injecting random values.
  
It can produce integers, longs, uuids, or strings, as shown in the following example:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">my.secret=${random.value}
my.number=${random.int}
my.bignumber=${random.long}
my.uuid=${random.uuid}
my.number.less.than.ten=${random.int(10)}
my.number.in.range=${random.int[1024,65536]}
</code></pre>

## Placeholders in Properties

You can refer back to previously defined values.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">net.flywithfan.desc=${net.flywithfan.owner}'s ${net.flywithfan.type}
</code></pre>

## Accessing Command Line Properties

By default, SpringApplication converts any command line option arguments (that is, arguments starting with &#8211;, such as &#8211;server.port=9000) to a property and adds them to the Spring Environment. As mentioned previously, command line properties always take precedence over other property sources. SEE [HERE](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config-command-line-args).

you can disable them by using `SpringApplication.setAddCommandLineProperties(false)`

## Application Property Files Priorities

SpringApplication loads properties from application.properties files in the following locations and adds them to the Spring Environment:

  1. A /config subdirectory of the current directory
  2. The current directory
  3. A classpath /config package
  4. The classpath root

![](/assets/img/uploads/2018/Screen-Shot-2018-03-27-at-16.22.59.png)

Hence, the property in application.properties under **config/** would override those in resources folder.

For example, `net.flywithfan.helloMsg=I am number one in sequence.` would lead to an output **_I am number one in sequence._** instead of
  
**_Hello, I am from China._** with url http://localhost:8080/hello

## Profile-specific Properties

In addition to application.properties files, profile-specific properties can also be defined by using the following naming convention: application-{profile}.properties. The Environment has a set of default profiles (by default, [default]) that are used if no active profiles are set. In other words, if no profiles are explicitly activated, then properties from application-default.properties are loaded.

i.e

  * **application-dev.properties** for development config
  * **application-pro.properties** for production config

To get there, we should specify the spring.profiles.active property like this:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">spring.profiles.active=dev
</code></pre>

Alternatively, it can come with the boot parameters as well.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">java -jar xxx.jar --spring.profiles.active=dev

</code></pre>

## Using YAML Instead of Properties

YAML is a superset of JSON and, as such, is a convenient format for specifying hierarchical configuration data.

> If you use “Starters”, SnakeYAML is automatically provided by spring-boot-starter. 

application.yaml

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-yaml">net:
  flywithfan:
             admin-name: yangluhao
             enable-password: true
             tags:
              - Java
              - Spring MVC
              - Spring Boot
             msg: 你好
</code></pre>

AdminConfig.java

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">@Component
@ConfigurationProperties(prefix="net.flywithfan")
public class AdminConfig {
    private String adminName;
    private boolean enablePasseword;
    private List&lt;String&gt; tags;
    private String msg;

    //getters and setters ...

    @Override
    public String toString() {
        return "AdminConfig{" +
                "adminName='" + adminName + '\'' +
                ", enablePasseword=" + enablePasseword +
                ", tags=" + tags +
                ", msg='" + msg + '\'' +
                '}';
    }
}
</code></pre>

HelloController.java

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">    @RequestMapping("/admin")
    public String admin(){
        return ac.toString();
    }
</code></pre>

open http://localhost:8080/admin, output:

**_AdminConfig{adminName=&#8217;yangluhao&#8217;, enablePasseword=false, tags=[Java, Spring MVC, Spring Boot], msg=&#8217;你好&#8217;}_**

As you can see, yaml is very easy to write and read, and also support chinese correctly. I tried using chinese in application.properties but it turned out a mess.

It is said that changing setting like this should solve this problem. Unfortunately it didn&#8217;t work out for me.

![](/assets/img/uploads/2018/Screen-Shot-2018-03-27-at-17.39.16.png)

So I&#8217;d better use yaml, lol&#8230;

## @ConfigurationProperties vs. @Value

The @Value annotation is a core container feature, and it does not provide the same features as type-safe configuration properties. The following table summarizes the features that are supported by @ConfigurationProperties and @Value:

![](/assets/img/uploads/2018/Screen-Shot-2018-03-27-at-17.54.00.png)

# Reference

1.[Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)
  
2.[Common application properties](https://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html)