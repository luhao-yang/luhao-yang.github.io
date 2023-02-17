---
id: 176
title: DOM Event and its Model
#date: 2018-01-30T17:36:10+00:00
author: Luhao
summary: 'Today I wanna go over the Event related things, just basic knowledgeand do some experiments, '
layout: post
#guid: http://flywithfan.net/?p=176
#permalink: /web/176/
categories:
  - Frontend
tags:
  - browser
---
## Event

Today I wanna go over the Event related things, just basic knowledge, no big deal.

### EventTarget

EventTarget is an interface implemented by objects that can receive events and may have listeners for them.

Element, document, and window are the most common event targets, but other objects can be event targets too, for example XMLHttpRequest, AudioNode, AudioContext, and others.

Many event targets (including elements, documents, and windows) also support setting event handlers via on&#8230; properties and attributes.

Methods:
  
&#8211; EventTarget.addEventListener()
  
Register an event handler of a specific event type on the EventTarget.
  
&#8211; EventTarget.removeEventListener()
  
Removes an event listener from the EventTarget.
  
&#8211; EventTarget.dispatchEvent()
  
Dispatch an event to this EventTarget.

### Event dispatch and DOM event flow

This section gives a brief overview of the event dispatch mechanism and describes how events propagate through the DOM tree. Applications can dispatch event objects using the dispatchEvent() method, and the event object will propagatae through the DOM tree as determined by the DOM event flow.
  
![Event dispatch and DOM event flow](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)

Event objects are dispatched to an event target. But before dispatch can begin, the event object’s propagation path must first be determined.

The propagation path is an ordered list of current event targets through which the event passes. This propagation path reflects the hierarchical tree structure of the document. The last item in the list is the event target, and the preceding items in the list are referred to as the target’s ancestors, with the immediately preceding item as the target’s parent.

Once the propagation path has been determined, the event object passes through one or more event phases. There are three event phases: capture phase, target phase and bubble phase. Event objects complete these phases as described below. A phase will be skipped if it is not supported, or if the event object’s propagation has been stopped. For example, if the bubbles attribute is set to false, the bubble phase will be skipped, and if stopPropagation() has been called prior to the dispatch, all phases will be skipped.

  * **The capture phase**: The event object propagates through the target’s ancestors from the Window to the target’s parent. This phase is also known as the capturing phase.</p> 
  * **The target phase**: The event object arrives at the event object’s event target. This phase is also known as the at-target phase. If the event type indicates that the event doesn’t bubble, then the event object will halt after completion of this phase.

  * **The bubble phase**: The event object propagates through the target’s ancestors in reverse order, starting with the target’s parent and ending with the Window. This phase is also known as the bubbling phase.

### listener

1.HTML on-xxx attribute

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;p onclick="foo()"&gt;click me&lt;/p&gt;

&lt;!-- attention: this will not work --&gt;
&lt;p onclick="foo"&gt;click me&lt;/p&gt;

&lt;!-- if you want pass event or something related to this element --&gt;

&lt;p onclick="foo(event)"&gt;click me&lt;/p&gt;
&lt;!-- or use event=window.event inside function foo --&gt;

&lt;p id="p1" onclick="foo(this.id)"&gt;click me&lt;/p&gt;

</code></pre>

2.element.xxx

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">var divDOM = document.querySelector('#test')
divDOM.onclick = function(){
    //....
}

</code></pre>

3.addEventListener

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
target.addEventListener(type, listener[, useCapture, wantsUntrusted  ]); // Gecko/Mozilla only


/*

options Optional
An options object that specifies characteristics about the event listener. The available options are:
- capture: A Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.  
- once: A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.
- passive: A Boolean indicating that the listener will never call preventDefault(). If it does, the user agent should ignore it and generate a console warning. See Improving scrolling performance with passive listeners to learn more.

useCapture Optional
A Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
Events that are bubbling upward through the tree will not trigger a listener designated to use capture.  
Event bubbling and capturing are two ways of propagating events which occur in an element that is nested within another element, when both elements have registered a handle for that event.  
The event propagation mode determines the order in which elements receive the event. See DOM Level 3 Events and JavaScript Event order for a detailed explanation. If not specified, useCapture defaults to false.
*/

</code></pre>

4.this

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">//in these codes, this would refer to the element

// JavaScript
element.onclick = print
element.addEventListener('click', print, false)
element.onclick = function () {console.log(this.id);}

// HTML
&lt;element onclick="console.log(this.id)"&gt;

//but below, this would refer to global, which is window object in browser

// JavaScript
element.onclick = function (){ doSomething() };
element.setAttribute('onclick', 'doSomething()');

// HTML
&lt;element onclick="doSomething()"&gt;

</code></pre>

### Default actions and cancelable events

Events are typically dispatched by the implementation as a result of a user action, in response to the completion of a task, or to signal progress during asynchronous activity (such as a network request). Some events can be used to control the behavior that the implementation may take next (or undo an action that the implementation already took). Events in this category are said to be cancelable and the behavior they cancel is called their default action. Cancelable event objects can be associated with one or more &#8216;default actions&#8217;. To cancel an event, call the preventDefault() method.

For instance:

The default action associated with the click event on  <input type="checkbox" />elements toggles the checked IDL attribute value of that element. If the click event’s default action is cancelled, then the value is restored to its former state.

When an event is canceled, then the conditional default actions associated with the event is skipped (or as mentioned above, if the default actions are carried out before the dispatch, their effect is undone). Whether an event object is cancelable is indicated by the cancelable attribute. Calling preventDefault() stops all related default actions of an event object. The defaultPrevented attribute indicates whether an event has already been canceled (e.g., by a prior event listener). If the DOM application itself initiated the dispatch, then the return value of the dispatchEvent() method indicates whether the event object was cancelled.

Attention:

The isTrusted attribute of trusted events has a value of true, while untrusted events have a isTrusted attribute value of false.

Most untrusted events will not trigger default actions, with the exception of the click event. This event always triggers the default action, even if the isTrusted attribute is false (this behavior is retained for backward-compatibility). All other untrusted events behave as if the preventDefault() method had been called on that event.

FOR MORE INFORMATION:

various kinds of Event types and other related event knowledges such as composition event types, please visit W3C [DOM-Level-3-Events](https://www.w3.org/TR/DOM-Level-3-Events/)

* * *

Here I wanna do some experiments to emphasize some understanding of events.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">    &lt;!-- html --&gt;
      &lt;div id="test"&gt;
        &lt;p onclick="t1(event)"&gt;text1&lt;/p&gt;
        &lt;p&gt;text2&lt;/p&gt;
      &lt;/div&gt;
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">    var divDOM = document.querySelector('#test')
    var text1DOM = document.querySelectorAll('#test &gt; p')[0]
    var text2DOM = document.querySelectorAll('#test &gt; p')[1]


    divDOM.addEventListener('click', e =&gt; {
        console.log('div, should be bubbling')
        printEvent(e)
    }, false)

    divDOM.addEventListener('click', e =&gt; {
        console.log('div, should be capturing')
        printEvent(e)
    }, true)

    divDOM.onclick = function(){
        var e = window.event
        console.log('div, defined by js onclick')
        printEvent(e)
    }

    text1DOM.addEventListener('click', e =&gt; {
        console.log('text1, should be bubbling')
        printEvent(e)
    }, false)

    text1DOM.addEventListener('click', e =&gt; {
        console.log('text1, shoule be capturing')
        printEvent(e)
    }, true)

    // HTML onclick
    function t1(e) {
        console.log('text1, defined by html onclick')
        printEvent(e)
    }

    text2DOM.onclick = function(){
        var e = window.event
        console.log('text2, defined by js onclick')
        printEvent(e)
        e.stopPropagation()        
    }

    const eventPhase = {
        1: 'Event.CAPTURING_PHASE',
        2: 'Event.AT_TARGET',
        3: 'Event.BUBBLING_PHASE'
    }

    function printEvent(e) {
        let str = ''
        str += 'eventPhase=' + eventPhase[e.eventPhase] + ', '
        str += 'type=' + e.type + ', '
        str += 'cancelable=' + e.cancelable + ', '
        str += 'bubbles=' + e.bubbles
        console.log(str)
    }


//click text1, output of console:
/*
div, should be capturing
    eventPhase=Event.CAPTURING_PHASE, type=click, cancelable=true, bubbles=true
text1, defined by html onclick
    eventPhase=Event.AT_TARGET, type=click, cancelable=true, bubbles=true
text1, should be bubbling
    eventPhase=Event.AT_TARGET, type=click, cancelable=true, bubbles=true
text1, shoule be capturing
    eventPhase=Event.AT_TARGET, type=click, cancelable=true, bubbles=true
div, should be bubbling
    eventPhase=Event.BUBBLING_PHASE, type=click, cancelable=true, bubbles=true
div, defined by js onclick
    eventPhase=Event.BUBBLING_PHASE, type=click, cancelable=true, bubbles=true

here you can see the event flow very clearly, what should be noted is:

we use addEventListener method to append callbacks to text1 both on capturing and bubbling phase, but since we clicked the text1, it is supposed to be the target element.
So no matter it's in capuring or bubbling phase it will be merged into target phase.

ANOTHER THING IS:

we bind three callbacks on text1, what is its order
like?

For its parent Node, which is div in this example:
capturing -&gt; bubbling -&gt; onclick

For text1 in this example, will be the same?
NO! it's :
onclick -&gt; bubbling -&gt; capturing

Technically, its order is compliant with the order of binding. As you can see, I bind bubbling listeners before capturing,
hence it should be invoked earlier. But why html on attribute is the first?
I think it is because html rendered first then javascript executed.

*/


//click text2, output of console:
/*

div, should be capturing
    eventPhase=Event.CAPTURING_PHASE, type=click, cancelable=true, bubbles=true
text2, defined by js onclick
    eventPhase=Event.AT_TARGET, type=click, cancelable=true, bubbles=true



//difference between stopPropagation and stopImmediatePropagation

If several listeners are attached to the same element for the same event type, they are called in order in which they have been added. 
If during one such call, event.stopImmediatePropagation() is called, no remaining listeners will be called.

so if we use stopPropagation in function t1, it would only stop propagation to div, but the three listeners would still called. 


*/

</code></pre>