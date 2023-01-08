---
id: 234
title: Markdown Test
#date: 2018-03-23T17:42:36+00:00
author: Luhao
layout: post
#guid: http://flywithfan.net/?p=234
#permalink: /misc/234/
categories:
  - Tech
---
# Title1

## Title2

### Title3

#### Title4

##### Title5

###### Title6

You can use one # all the way up to ###### six for different heading sizes.

* * *

This is normal text looks like.
  
_This text will be italic_
  
_This will also be italic_

**This text will be bold**
  
**This will also be bold**

_You **can** combine them_

* * *

Sometimes you want numbered lists:

  1. One
  2. Two
  3. Three

Sometimes you want bullet points:

  * Start a line with a star
  * Profit!

Alternatively,

  * Dashes work just as well
  * And if you have sub points, put two spaces before the dash or star: 
      * Like this
      * And this

* * *

http://github.com &#8211; automatic!
  
[GitHub](http://github.com)

> This is quote. blablabla
    
> blablabla 

* * *

If you want to embed images, this is how you do it:

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

* * *

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-java">package com.domain.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude= {DataSourceAutoConfiguration.class})
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

</code></pre>

* * *

  * <input style="margin-right:5px" type="checkbox" class="task-list-item-checkbox" checked disabled />@mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
  * <input style="margin-right:5px" type="checkbox" class="task-list-item-checkbox" checked disabled />list syntax required (any unordered or ordered list supported)
  * <input style="margin-right:5px" type="checkbox" class="task-list-item-checkbox" checked disabled />this is a complete item
  * <input style="margin-right:5px" type="checkbox" class="task-list-item-checkbox" disabled />this is an incomplete item

* * *

| First Header                | Second Header                |
| --------------------------- | ---------------------------- |
| Content from cell 1         | Content from cell 2          |
| Content in the first column | Content in the second column |

**insert html**

</p> 

<pre>(A)  The client requests authorization from the resource owner.  The
        authorization request can be made directly to the resource owner
        (as shown), or preferably indirectly via the authorization
        server as an intermediary.

   (B)  The client receives an authorization grant, which is a
        credential representing the resource owner's authorization,
        expressed using one of four grant types defined in this
        specification or using an extension grant type.  The
        authorization grant type depends on the method used by the
        client to request authorization and the types supported by the
        authorization server.

   (C)  The client requests an access token by authenticating with the
        authorization server and presenting the authorization grant.

    </pre>

</p> 

* * *

reference: [markdown](https://guides.github.com/features/mastering-markdown/)