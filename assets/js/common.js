

function showList(tagName) {
  $("#tag-container .tag-details").css("display", "none");
  $(`#${tagName}-list`).css("display", "block");
}
