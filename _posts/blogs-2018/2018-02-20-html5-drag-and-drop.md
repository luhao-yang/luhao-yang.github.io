---
id: 192
title: HTML5 drag and drop
#date: 2018-02-20T17:11:07+00:00
author: Luhao
summary: HTML5 drag and drop introduction and example
layout: post

categories:
  - Frontend
tags:
  - browser
---

HTML Drag and Drop interfaces enable applications to use drag and drop features in Firefox and other browsers. For example, with these features, the user can select draggable elements with a mouse, drag the elements to a droppable element, and drop those elements by releasing the mouse button. A translucent representation of the draggable elements follows the mouse pointer during the drag operation.

## Drag Events

| Event     | On Event Handler | Description                                                                                                                              |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| drag      | ondrag           | Fired when an element or text selection is being dragged.                                                                                |
| dragend   | ondragend        | Fired when a drag operation is being ended (for example, by releasing a mouse button or hitting the escape key). (See Finishing a Drag.) |
| dragenter | ondragenter      | Fired when a dragged element or text selection enters a valid drop target. (See Specifying Drop Targets.)                                |
| dragexit  | ondragexit       | Fired when an element is no longer the drag operation&#8217;s immediate selection target.                                                |
| dragleave | ondragleave      | Fired when a dragged element or text selection leaves a valid drop target.                                                               |
| dragover  | ondragover       | Fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).                      |
| dragstart | ondragstart      | Fired when the user starts dragging an element or text selection. (See Starting a Drag Operation.)                                       |
| drop      | ondrop           | Fired when an element or text selection is dropped on a valid drop target. (See Performing a Drop.)                                      |

## Drag and Drop Interfaces

The DragEvent interface has a constructor and one property, the dataTransfer property which is a DataTransfer object. DataTransfer objects include the drag event&#8217;s state such as the type of drag being done (for example copy or move), the drag&#8217;s data (one or more items) and the type of each drag item (a MIME type). DataTransfer objects also have methods to add items to the drag&#8217;s data and to remove a drag item. The DragEvent and DataTransfer interfaces should be the only ones needed to add HTML drag and drop capabilities to an application. However, note Firefox supports some Gecko-specific extensions to the DataTransfer object that may be used, although those extensions will only work on Firefox.

Each DataTransfer object contains an items property which is a list of DataTransferItem objects. Each DataTransferItem object represents a single drag item and each item has a kind property which is the kind of data (either string or file) and a type property which is the data item&#8217;s type (i.e. MIME type). The DataTransferItem object also has methods to get the drag item&#8217;s data.

The DataTransferItemList object is a list of DataTransferItem objects. The list object has methods to: add a drag item to the list, remove a drag item from the list and clear the list of all drag items.

A key difference between the DataTransfer and DataTransferItem interfaces is that the former uses the synchronous getData() method to access a drag item&#8217;s data, whereas the latter uses the asynchronous getAsString() method to access a drag item&#8217;s data.

### Identify what is draggable

To make an element draggable requires adding the draggable attribute plus the ondragstart global event handler, as shown in the following code sample

### Define the drag&#8217;s data

The application is free to include any number of data items in a drag operation. Each data item is a string of a particular type, typically a MIME type such as text/html.

Each drag event has a dataTransfer property that holds the event&#8217;s data. This property (which is a DataTransfer object) also has methods to manage drag data. The setData() method is used to add an item to the drag data, as shown in the following example.

### Define the drag image

By default, the browser supplies an image that appears beside the mouse pointer during a drag operation. However, an application may define a custom image by using the setDragImage() method as shown in the following example.

### Define the drag effect

The dropEffect property is used to control the feedback (typically visual) the user is given during a drag and drop operation. It affects which cursor the browser displays while dragging. For example, when the user hovers over a target drop element, the browser&#8217;s cursor may indicate the type of operation that will occur.

Three effects may be defined:

**copy** indicates that the data being dragged will be copied from its present location to the drop location.

**move** indicates that the data being dragged will be moved

**link** indicates that some form of relationship or connection will be created between the source and drop locations.

### Define a drop zone

By default, the browser prevents anything from happening when dropping something onto the HTML element. To change that behavior so that an element becomes a drop zone or is droppable, the element must have both ondragover and ondrop event handler attributes. The following example shows how to use those attributes and includes basic event handlers for each attribute.

### Handle the drop effect

The handler for the drop event is free to process the drag data in an application specific way. Typically, an application will use the getData() method to retrieve drag items and process them accordingly. Additionally, application semantics may differ depending on the value of the dropEffect and/or the state of modifier keys.

### Drag end

At the end of a drag operation, the dragend event fires at the source element &#8211; the element that was the target of the drag start. This event fires whether the drag completed or was canceled. The dragend event handler can check the value of the dropEffect property to determine if the drag operation succeeded or not.

---

I made an experiment here, you can see my [demo](/assets/demo/dragdrop.html)

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">    &lt;div id="app"&gt;

        &lt;div class="dropzone" ondrop="drop_handler(event)" ondragover="dragover_handler(event);"&gt;
            &lt;h3&gt;drop zone&lt;/h3&gt;
            &lt;p&gt;
                the element must have both ondragover and ondrop event handler attributes
            &lt;/p&gt;
        &lt;/div&gt;

        &lt;div class="dropzone" ondrop="drop_handler(event)" ondragover="dragover_handler_move(event);"&gt;
            &lt;h3&gt;drop zone(only accept move)&lt;/h3&gt;
        &lt;/div&gt;

        &lt;div class="dragzone"&gt;
            &lt;ul&gt;
                &lt;li draggable="true" ondragstart="dragstart_handler(event,1);"&gt;copy effect&lt;/li&gt;
                &lt;li draggable="true" ondragstart="dragstart_handler(event,2);"&gt;move effect&lt;/li&gt;
                &lt;li draggable="true" ondragstart="dragstart_handler(event,3);"&gt;link effect&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;

        &lt;div class="dropzone" ondrop="drop_handler_file(event)" ondragover="dragover_handler_file(event);"&gt;
                &lt;h3&gt;drop zone for file&lt;/h3&gt;
            &lt;/div&gt;

    &lt;/div&gt;
</code></pre>

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">        function dragstart_handler(ev,effect) {
            var effectAllowed = ''
            switch(effect) {
                case 1: 
                    effectAllowed = 'copy'
                    break;
                case 2: 
                    effectAllowed = 'move'
                    break;
                case 3:
                    effectAllowed = 'link'
                    break;
            }
            ev.dataTransfer.effectAllowed = effectAllowed
            console.log(ev)
            ev.dataTransfer.setData("text/html", ev.target.innerText);
        }

        function dragover_handler(ev) {
            ev.preventDefault();
        }

        function dragover_handler_move(ev) {
            ev.preventDefault();
            // Set the dropEffect to move
            ev.dataTransfer.dropEffect = "move"
        }

        function drop_handler(ev) {
            ev.preventDefault();
            // Get the id of the target and add the moved element to the target's DOM
            var data = ev.dataTransfer.getData("text/html");
            var elementP = document.createElement("p")
            elementP.innerHTML = data
            ev.target.appendChild(elementP);
        }

        function dragover_handler_file(ev) {
            ev.stopPropagation()
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "all"
        }

        function drop_handler_file(ev) {
            ev.stopPropagation()
            ev.preventDefault();
            // Get the id of the target and add the moved element to the target's DOM
            console.log('drop_handler_file',ev)
            var dt = ev.dataTransfer;
            var files = dt.files;

            var count = files.length;
            console.log("File Count: " + count + "\n");

            for (var i = 0; i &lt; files.length; i++) {
            console.log(" File " + i + ":\n(" + (typeof files[i]) + ") : &lt;" + files[i] + " &gt; " +
                files[i].name + " " + files[i].size + "\n");
            }
        }

</code></pre>

As you noticed, to accomplish file upload, you need to use File APIs of browser to read file and send them to server.

Of course, you can use open source library such as [dropzone.js](http://www.dropzonejs.com/) to help you build file drag&#8217;n&#8217;drop function.

LINKS:

[HTML_Drag_and_Drop_API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
