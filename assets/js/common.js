

function showTagList(tagName) {
  $("#tag-container .tag-details").css("display", "none");
  $(`#${tagName}-list`).css("display", "block");
}



function showCategoryList(categoryName) {
  $("#category-container .category-details").css("display", "none");
  $(`#${categoryName}-list`).css("display", "block");
}


