  
$("<link>").attr({ href: "//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.css", rel: "stylesheet" }).appendTo("head");
$.ajax({
  url: "//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js",
  dataType: "script",
  cache: true
});

$(".language-mermaid").attr("class", "mermaid");

mermaid.init();

