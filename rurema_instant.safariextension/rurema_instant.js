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
          console.log("haha");
          $("div.content").html(html.replace(/[\s\S]+<div class="content">([\s\S]*)<\/div>[\s\S]+<div class="footer">[\s\S]+/,"$1"));
        }
      });
    },300);
  });

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
          document.body.innerHTML = html;
          query_remap();
        }
      });
    },300);
  });
} else {
  query_remap();

}
