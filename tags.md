---
layout: page
title: Tags
permalink: /tags/
---

<link rel="stylesheet" href="/assets/css/tags.css">
<script type="text/javascript" src="/assets/js/common.js"></script>

<div id="tag-container">
  <div id="tag-names">
{% for tag in site.tags %}
  {% assign index = forloop.index0 | modulo:7  %}
  {% assign colors = "yellow, blue, green, red, pink, sienna, rebeccaPurple " | split: ", "  %}
  {% capture tag_name %}{{ tag | first }}{% endcapture %}

    <a class="tag-button {{ colors[index] }}" onclick="showList('{{ tag_name | slugify}}')">{{ tag_name | upcase }}</a>

{% endfor %}

  </div>

{% for tag in site.tags %}
  {% capture tag_name %}{{ tag | first }}{% endcapture %}
  
  <div id="{{ tag_name | slugify }}-list" class="tag-details" style="display:none">
    <ul>
      {% for post in tag[1] %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
      {% endfor %}
    </ul>
  </div>

{% endfor %}

</div>
