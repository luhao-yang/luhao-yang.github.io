---
layout: page
title: Categories
permalink: /categories/
---

<link rel="stylesheet" href="/assets/css/categories.css">
<script type="text/javascript" src="/assets/js/common.js"></script>


{% assign sorted_cg_array = '' | split: '' %}

{% for cg in site.categories %}
  {% assign current_cg_name = cg[0]  %}
  {% assign current_cg_size = cg[1].size %}

  {% assign sorted_cg_array = sorted_cg_array | push: current_cg_name %}

  {% if sorted_cg_array.size < 2 %}
    {% continue %}
  {% endif %}

  {% assign sorted_array_length = sorted_cg_array.size | plus: 0 %}
  {% assign sorted_array_length_minusone = sorted_array_length | minus: 1 %}
  
    {% for i in (1..sorted_array_length_minusone) %}
      {% assign index = sorted_array_length_minusone | minus: i %}
      {% assign index_addone = index | plus:1 %}
      {% assign index_cg_name = sorted_cg_array[index]  %}
      {% assign index_addone_cg_name = sorted_cg_array[index_addone]  %}
      {% assign index_cg_size = site.categories[index_cg_name].size  %}
      {% assign index_addone_cg_size = site.categories[index_addone_cg_name].size  %}


      {% if index_cg_size < index_addone_cg_size %}
        {% assign orginal_value_at_index = sorted_cg_array[index] %}
        {% assign orginal_value_at_index_addone = sorted_cg_array[index_addone] %}

        {% assign newArray = '' | split: '' %}
        {% for c in sorted_cg_array %}
          {% if forloop.index0 == index %}
            {% assign newArray = newArray | push: orginal_value_at_index_addone %}
          {% elsif forloop.index0 == index_addone %}
            {% assign newArray = newArray | push: orginal_value_at_index %}
          {% else %}
            {% assign newArray = newArray | push: c  %}
          {% endif %}
        {% endfor %}
        {% assign sorted_cg_array = newArray %}
       
      {% else%}
        {% break %}
      {% endif %}

    {% endfor %}

{% endfor %}


<div id="category-container" class="container text-left">
  <div class="row">
    <div id="category-names" class="col col-3">
      {% for category_name in sorted_cg_array %}
        {% assign index = forloop.index0 | modulo:9 %}
        {% assign colors = "sienna,red,orange,yellow,green,pink,mediumPurple,blue,gray" | split: ","  %}

        {% capture category_name_for_id %}{{ category_name | slugify | downcase  }}{% endcapture %}
        {% assign category_size = site.categories[category_name].size %}


        <div class="category-button {{ colors[index] }}"><a onclick="showCategoryList('{{ category_name_for_id }}')">{{ category_name }} ({{ category_size }})</a>
        </div>
        
      {% endfor %}
    </div>

    <div class="col col-9">
      {% for category in site.categories %}
        {% capture category_name %}{{ category | first }}{% endcapture %}
        {% capture category_name_for_id %}{{ category | first | slugify | downcase  }}{% endcapture %}
        <div id="{{ category_name_for_id }}-list" class="category-details" style="display:none">
          {% for post in site.categories[category_name] %}
            <article class="archive-item">
              <h6><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h6>
            </article>
          {% endfor %}
        </div>

      {% endfor %}
    </div>
  </div>
</div>

