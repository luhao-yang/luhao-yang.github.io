---
layout: page
title: Categories
permalink: /categories/
---

<link rel="stylesheet" href="/assets/css/categories.css">
<script type="text/javascript" src="/assets/js/common.js"></script>

<div id="category-container" class="container text-left">
  <div class="row">
    <div id="category-names" class="col col-3">
      {% for category in site.categories %}
        {% capture category_name %}{{ category | first }}{% endcapture %}
        {% capture category_name_for_id %}{{ category | first | slugify | downcase  }}{% endcapture %}
        <div class="category-button"><a onclick="showCategoryList('{{ category_name_for_id }}')">{{ category_name }}</a>
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

