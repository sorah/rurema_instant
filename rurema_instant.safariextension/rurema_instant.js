tid = 0;
function query_remap() {
  $("input.query").keyup(function(){
    clearTimeout(tid);
    tid = setTimeout(function() {
      if($("input.query").val()==""){
        $("div.content").html("");
        return;
      }
      $.ajax({
        type: "POST",
        url: "./",
        data: "query="+$("input.query").val(),
        cache: false,
        success: function(html){
          location.hash = "#" + $("input.query").val();
          $("div.content").html(html.replace(/[\s\S]+<div class="content">([\s\S]*)<\/div>[\s\S]+<div class="footer">[\s\S]+/,"$1"));
        }
      });
    },300);
  });
  $("input.query").focus();
}
if($(".search-header").length == 0) {
  $("#query-input").keyup(function(){
    clearTimeout(tid);
    tid = setTimeout(function() {
      $.ajax({
        type: "POST",
        url: "./",
        data: "query="+$("#query-input").val(),
        cache: false,
        success: function(html){
          location.hash = "#" + $("#query-input").val();
          document.body.innerHTML = html;
          query_remap();
        }
      });
    },300);
  });
} else {
  query_remap();
}
if(location.hash != ""){
  var q = location.hash.replace(/^#/,"");
  $.ajax({
    type: "POST",
    url: "./",
    data: "query="+q,
    cache: false,
    success: function(html){
      document.body.innerHTML = html;
      if($(".search-header").length == 0) {
        query_remap();
      }
    }
  });
  $("#query-input, input.query").val(q);
}
