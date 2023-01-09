---
layout: page
title: Categories
permalink: /categories/
---

<div class="accordion" id="accordion-container">
{% for category in site.categories %}
  {% capture category_name %}{{ category | first }}{% endcapture %}
  {% capture category_name_for_id %}{{ category | first | slugify | downcase  }}{% endcapture %}

  <div class="accordion-item">
    <h2 class="accordion-header" id="{{ category_name_for_id }}-heading">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#{{ category_name_for_id }}-body" aria-expanded="true" aria-controls="{{ category_name_for_id }}-body">
        {{ category_name }}
      </button>
    </h2>
    <!-- Omit the data-bs-parent attribute on each .accordion-collapse to make accordion items stay open when another item is opened. -->
    <!-- data-bs-parent="#accordion-container" -->
    <div id="{{ category_name_for_id }}-body" class="accordion-collapse collapse show" aria-labelledby="{{ category_name_for_id }}-heading" >
      <div class="accordion-body">
        {% for post in site.categories[category_name] %}
          <article class="archive-item">
            <h4><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h4>
          </article>
        {% endfor %}
      </div>
    </div>
  </div>
{% endfor %}
</div>
