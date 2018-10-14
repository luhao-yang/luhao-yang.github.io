---
id: 167
title: 'A mini game: Overlapping Maze'
#date: 2018-01-13T23:58:14+00:00
author: Luhao
summary: 'Last week, I saw a TV show named 最强大脑, which means The Smartest Brain in English.During the showtime, I was deeply attracted by a game called 层叠消融. '
layout: post
#guid: http://flywithfan.net/?p=167
#permalink: /javascript/167/
categories:
  - JavaScript
tags:
  - javascript
---
### Why did I do this?

Last week, I saw a TV show named 最强大脑, which means The Smartest Brain in English.During the showtime, I was deeply attracted by a game called 层叠消融.

It&#8217;s very interesting and difficult so I decided to develop this game all by myself. I have no idea of what the English name of this game should have, then I just give it a name:

#### Overlapping Maze!

There are some figures in the painting area, indicating that when draging them to a position of overlapping position, even number of layers vanish but odd number of layers comes out.

I use SVG to construct shapes, currently just rectangles form. To be convenient, I use javascript to manipulate svg elements with SVG.js instead of writing svg xml directly.

You can get [SVG.js](http://svgjs.com/) by clicking the link.

Let&#8217;s take a look at the code. It&#8217;s very simple and reader-friendly. I know I just handle the simplest situation that only rectangles engaged in. I am planning to support any circular or polygonal shapes in the future, and I have come up with the algorithm of calculating complicated intersection of various shapes, which I think is the most important part in this game! Let&#8217;s talk about it later. Now we just consider the simple situation and understand the mechanism of this protoype.

Play the demo here [overlapping maze](http://flywithfan.net/demo/overlappingmaze/)

#### What I do:

  1. initialize some shapes, just rectangles for this demo
  2. bind functions on drag events, both dragstart and dragend
  3. calculating intersections between those shapes
  4. create areas of intersections, then fill white or black based on how many layers overlapped. Is the overlapping section a even number or odd one?

step 3 and 4 are the most difficult part, I have discussed it with my smart girlfirend to figure out how to do it. (^_^)

#### Here is the source code.

**index.html**

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;link href="css/styles.css" rel="stylesheet" type="text/css"&gt;
    &lt;script src="js/svg.js"&gt;&lt;/script&gt;
    &lt;script src="js/svg.draggable.js"&gt;&lt;/script&gt;

    &lt;style &gt;
body {
    padding: 0;
    margin: 0;
}

header {
    text-align: center;
}

.content {
    width: 100%;
    height: 600px;
    border: solid 1px #000;
}
    &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
&lt;header&gt;
    &lt;h1&gt;Overlapping Maze&lt;/h1&gt;
    &lt;h3&gt;Even number of layers vanish; Odd number of layers comes out&lt;/h3&gt;
&lt;/header&gt;

&lt;div class="content" id="drawing"&gt;

&lt;/div&gt;
&lt;script src="js/main.js"&gt;&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre>

**main.js**

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">&lt;br />if (SVG.supported) {

    var draw = SVG('drawing').size('100%','100%')
    var offsetX = 50;
    var offsetY = 50;

    var rect1 = createRect(100, 100)
    var rect2 = createRect(100, 50)
    var rect3 = createRect(100, 50)
    var rect4 = createRect(50, 50)
    var rect5 = createRect(80, 80)

    var interArea = null

    var rects = []
    var arr = []
    var carr = []
    rects.splice(rects.length - 1, 0, rect1, rect2, rect3, rect4, rect5)

}else{
    alert('SVG not supported in your browser!')
}



function createRect(width, height){
    var rect = draw.rect(width, height).attr({ fill: 'black' })
    rect.draggable().on('dragstart.rect', rectDragstart)
    rect.draggable().on('dragend.rect', rectDragend)
    rect.move(offsetX, offsetY)
    offsetX += width + 50
    return rect
}

function instersection(rect1, rect2){
    var x1 = rect1.x(),
        x2 = x1 + rect1.width(),
        y1 = rect1.y(),
        y2 = y1 + rect1.height(),
        x3 = rect2.x(),
        x4 = x3 + rect2.width(),
        y3 = rect2.y(),
        y4 = y3 + rect2.height();

    var area = {}
    if (x1 &lt;= x3 && x3 &lt;= x2 && x4 &gt;= x2) {
        area.x = x3
        area.width = x2 - x3
    } else if (x1 &lt;= x4 && x4 &lt;= x2 && x3 &lt;= x1) {
        area.x = x1
        area.width = x4 - x1
    } else if ( x1 &lt;= x3 && x4 &lt;= x2 ) {
        area.x = x3
        area.width = x4 - x3
    } else if ( x3 &lt;= x1 && x2 &lt;= x4 ) {
        area.x = x1
        area.width = x2 - x1
    } else {
        return null
    }

    if (y1 &lt;= y3 && y3 &lt;= y2 && y4 &gt;= y2) {
        area.y = y3
        area.height = y2 - y3
    } else if (y1 &lt;= y4 && y4 &lt;= y2 && y3 &lt;= y1) {
        area.y = y1
        area.height = y4 - y1
    }else if ( y1 &lt;= y3 && y4 &lt;= y2 ) {
        area.y = y3
        area.height = y4 - y3
    } else if ( y3 &lt;= y1 && y2 &lt;= y4 ) {
        area.y = y1
        area.height = y2 - y1
    } else {
        return null
    }

    return area
}

function rectDragstart(event) {
    deleteArea()
}

function rectDragend(event){
    //optimize: if needs to update all elements
    var me = this
    for(var i=0;i&lt;rects.length;i++) {
        arr.push(rects[i])
        carr.push(1)
        var len = arr.length;// because arr's length is gaining
        for(var j=0;j&lt;len;j++) {
            //pass the itself
            if(arr[j] === rects[i] ){
                continue;
            }
            // has no intersection with null
            if(arr[j] == null){
                carr.push(0)          
                arr.push(null)
                continue;
            }

            var area = instersection(arr[j], rects[i])
            var interRect = null
            if (area) {
                var count = carr[j] + 1
                interRect = draw.rect(area.width, area.height).move(area.x, area.y)
                if ( count % 2 == 1 ) {
                    interRect.attr({ fill: 'black' })
                } else {
                    interRect.attr({ fill: 'white' })
                }
                carr.push(count)          
                arr.push(interRect)
            } else {
                carr.push(0)          
                arr.push(null)
            }

        }
    }
}



function deleteArea() {
    for(var i=0;i&lt;arr.length;i++) {
        var find = rects.indexOf(arr[i])
        if( find == -1 && arr[i]) {
            arr[i].remove()
        }
    }
    arr = []
    carr = []
}

</code></pre>

### What should be done next?

  1. Extend the category of shapes, circle, ellipse, ploygon&#8230;
  2. Optimize the visual effect when dragging