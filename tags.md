---
layout: page
title: Tags
permalink: /tags/
---

<link rel="stylesheet" href="/assets/css/tags.css">
<script type="text/javascript" src="/assets/js/common.js"></script>

<!-- You can do a maximum of 50 iterations with a for loop. If you need to iterate over more than 50 items, then use the paginate tag to split the items over multiple pages. -->


{% assign sorted_tags_array = '' | split: '' %}

{% for tag in site.tags %}
  {% assign current_tag_name = tag[0]  %}
  {% assign current_tag_size = tag[1].size %}

  {% assign sorted_tags_array = sorted_tags_array | push: current_tag_name %}

  {% if sorted_tags_array.size < 2 %}
    {% continue %}
  {% endif %}

  {% assign sorted_array_length = sorted_tags_array.size | plus: 0 %}
  {% assign sorted_array_length_minusone = sorted_array_length | minus: 1 %}
  
    {% for i in (1..sorted_array_length_minusone) %}
      {% assign index = sorted_array_length_minusone | minus: i %}
      {% assign index_addone = index | plus:1 %}
      {% assign index_tag_name = sorted_tags_array[index]  %}
      {% assign index_addone_tag_name = sorted_tags_array[index_addone]  %}
      {% assign index_tag_size = site.tags[index_tag_name].size  %}
      {% assign index_addone_tag_size = site.tags[index_addone_tag_name].size  %}


      {% if index_tag_size < index_addone_tag_size %}

        {% assign orginal_value_at_index = sorted_tags_array[index] %}
        {% assign orginal_value_at_index_addone = sorted_tags_array[index_addone] %}

        {% assign newArray = '' | split: '' %}
        {% for c in sorted_tags_array %}
          {% if forloop.index0 == index %}
            {% assign newArray = newArray | push: orginal_value_at_index_addone %}
          {% elsif forloop.index0 == index_addone %}
            {% assign newArray = newArray | push: orginal_value_at_index %}
          {% else %}
            {% assign newArray = newArray | push: c  %}
          {% endif %}
        {% endfor %}
        {% assign sorted_tags_array = newArray %}
       
      {% else%}
        {% break %}
      {% endif %}

    {% endfor %}

{% endfor %}


<div id="tag-container">
  <div id="tag-names">
{% for tag_name in sorted_tags_array %}
  {% assign index = forloop.index0 | modulo:9 %}
  {% assign colors = "sienna,red,orange,yellow,green,pink,mediumPurple,blue,gray" | split: ","  %}

  {% assign tag_size = site.tags[tag_name].size %}

    <a class="tag-button {{ colors[index] }}" onclick="showTagList('{{ tag_name | slugify}}')">{{ tag_name | upcase }} ({{ tag_size }})</a>

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

