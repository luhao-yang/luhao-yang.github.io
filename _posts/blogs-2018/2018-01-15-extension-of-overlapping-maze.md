---
id: 168
title: Extension of Overlapping Maze
#date: 2018-01-15T11:51:48+00:00
author: Luhao
summary: 'Some extended thoughts about my mini game - Overlapping Maze'
layout: post
#guid: http://flywithfan.net/?p=168
#permalink: /javascript/168/
categories:
  - Misc
tags:
  - javascript
---
In the last episode, I wrote a mini game named Overlapping Maze, which I only considered rectangles, the horizontal/vertical aligned rectangles technically.

Now let&#8217;s talk about a more universal situation, in spite of what kinds of shapes are, what the position they are lying, etc.

So we need to calculat the intersection area of each shapes, basically they are polygons. Hence, we should address these three questions:

  1. determine whether two polygons intersect.
  2. find and build the intersection area 
  3. determine what its color should be

I have thought about it seriously from the realizing perspective, but I don&#8217;t have time to write it. Here is my solutions.

* * *

**Q1: determine whether two polygons intersect**

  1. determine whether every vertex is in the other polygon seperately;
  2. if none of vertexs lies in the other polygon, these two polygons do not intersect;
  3. otherwise, they do.

Therefore, the problem is how to determine a vertex lies in a polygon?

I come up with a solution which I don&#8217;t know if it is a smart one.

Let&#8217;s assume that the vertex is **_a_**, which coordinate is (x,y) is connect it with original point(0,0) then we get a line **_A_**. If **_a_** lies in a polygon, it must cross at least one edge of the polygon.

the equation of **_A_** is:

> y1 = k1&#42;x1, **_k1_** is the slope ratio of line **_A_**. 

assuming the equation of edge is:

> y2 = k2&#42;x2 + C2 

**_k2_** is the slope ratio of the edge, **_C2_** is the constant. We can find determine the **_K2_** and **_C2_** by finding two points in the edge, that is two vertexs on each side of the edge.

  * if k1 = k2, two lines parallel with each ohter;
  * otherwise, there must be a conjunction point(x,y), indicating the equation below: 

> k1 &#42; x1 = k2 &#42; x2 + C2 

we get the specific coordinate of this point(x,y), then we can to decide whether this point is in the section of the edge. The **_x_** and **_y_** should be between the two vertexs.

**Q2: find and build the intersection area**
  
This is really simple that we only need to link them all together, that includes vertexs in the other polygons and the conjunction points of two ploygons.
  
To draw shapes in the svg area, we can just use these all coordinates as parameters to create a polygon. See API at [SVG.Polygon](http://svgjs.com/elements/#svg-polygon)

**_Q3: determine what its color should be_**
  
To address the problem, we simply need a array to record the layers of each section. I have already finished this part in last episode.
  
I would discuss it again in case someone doesn&#8217;t know or someone could give me some advices.

Assume that we have polygons: A, B
  
put them into a array, A&B represents the intersection of A and B,
  
notice that A&B could be null if no intersection.

So the arry is like:
  
[A, B, A&B]

Then we create a corresponding array to record their layers:
  
[1, 1, 2(or 0)]

If the count is even number then we fill black color into this area, otherwise, we fill it with white.

These could easily applied to there or more polygons:
  
[A, B, A&B, C, A&C, B&C, A&B&C]
  
[1, 1, 2(or 0), 1, 2(or 0), 2(or 0), 3(or 1) ]

* * *

OK, that&#8217;s done. I still have no idea what should be done to optimize the visual effect. The current situation is :

1.when receiving drag start event, I clear all intersecton areas.
  
2.when the drag is done, I calculate the new intersecton areas and build them with correct color, the move to the right position to cover the intersection(actually you just have to move white ones.)