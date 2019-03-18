$(function() {
  function no_list_when_fa() {
    $("div.fa").parents("li").css("list-style-type","none");
  }
  setTimeout(no_list_when_fa, 2000);
});