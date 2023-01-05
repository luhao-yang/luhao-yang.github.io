---
id: 178
title: Using Console
#date: 2018-01-31T17:02:13+00:00
author: Luhao
summary: "For most of the time, we just use console.log(), it's time to pick up new things"
layout: post
#guid: http://flywithfan.net/?p=178
#permalink: /misc/178/
categories:
  - Web
---
For most of the time(), we just use console.log or console.error() to output informartion in order to help us debug.

Now let&#8217;s learn more advanced skill.

**First of all, do you know how to format a output?**

The first parameter passed to any logging method may contain one or more format specifiers. Format specifier by one %immediately behind the sign of a letter, the letter format to indicate the value. The arguments after the string are applied to the placeholders in order.

The following example uses string and number format specifiers to insert values into the output string. You will see &#8220;Sam has 100 points&#8221; in the console.

`console.log("%s has %d points", "Sam", 100);`

`console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");`

The complete list of format specifiers is:

| Specifier  | Output                                                                          |
| ---------- | ------------------------------------------------------------------------------- |
| %s         | Format the value as a string                                                    |
| % i or % d | Format the value as an integer                                                  |
| %f         | Format the value as a floating-point value                                      |
| %O         | Format the value as an extensible DOM element. As shown in the Elements panel   |
| %O         | Format values as scalable JavaScript objects (author note :console.dir() )      |
| %c         | Apply the CSS style rule to the output string specified by the second parameter |

With powerful CSS , we can output message like this: (open console in browser, copy and input, then see what looks like)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">&lt;br />//Rainbow Text
console.log('%cRainbow Text ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');

//3D Text
console.log("%c3D Text"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em")

//Colorful CSS
console.log("%cColorful CSS","background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em")

</code></pre>

**Errors and warnings**

Errors and warnings have the same effect as regular logs. The only difference is error()and warn()the style of striking.

**assertion**
  
console.assert()The method may only its first parameter to falseconditionally display error strings (its second argument) time.

I personally seldomly use this.

**Organize the message together**

You can use group commands to organize related outputs together. console.group()Command to set a group name with a string argument. When this command is invoked in your JavaScript, the console begins to organize all subsequent output together.

To end the grouping, you just have to call it when done console.groupEnd().

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">&lt;br />var user = "jsmith", authenticated = false;
console.group("Authentication phase");
console.log("Authenticating user '%s'", user);
// authentication code here...
if (!authenticated) {
    console.log("User '%s' not authenticated.", user)
}
console.groupEnd();

</code></pre>

**Measurement execution time**

time()The method can start a new timer and is very useful for measuring the time it takes to do something. Pass a string to the method to name the tag.

If you want to stop the timer, call timeEnd()and passes the same string passed to the initial value of the setting item.

The console will then timeEnd()record label and the elapsed time method is triggered.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">&lt;br />console.time("Array initialize");
var array= new Array(1000000);
for (var i = array.length - 1; i &gt;= 0; i--) {
    array[i] = new Object();
};
console.timeEnd("Array initialize");

</code></pre>

**Count statement execution**

Use count()string provided a recording method, and the number has been provided in the same string. When the statement is provided to the same row on the same count()time, this number will increase.

The count()combined sample code used in some dynamic content:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">function login(user) {
    console.count("Login called for user " + user);
}

users = [ // by last name since we have too many Pauls.
    'Irish',
    'Bakaus',
    'Kinlan'
];

users.forEach(function(element, index, array) {
    login(element);
});

login(users[0]);
</code></pre>

**Compare similar data objects**

Use the table () method to view structured data and compare data objects.
  
Using the table()method, you can easily view objects and arrays containing similar data. When called, this method will extract the object&#8217;s properties and create a header. The row data is from the attribute value of each index.

In its most basic form, you only need an array of multiple objects with the same properties, and the table()command performs the remaining operations:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
console.table([[1,2,3], [2,3,4]]);
</code></pre>

![image](https://developers.google.com/web/tools/chrome-devtools/console/images/table-arrays.png)

**Abnormal and error handling**
  
Use console.trace() print the current JavaScript call stack.

* * *

That&#8217;s it. See more details, visit [google official doc](https://developers.google.com/web/tools/chrome-devtools/console/)