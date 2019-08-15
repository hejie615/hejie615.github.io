  
$("<link>").attr({ href: "//cdn.jsdelivr.net/npm/katex/dist/katex.min.css", rel: "stylesheet" }).appendTo("head");
$.ajax({
  url: "//cdn.jsdelivr.net/npm/katex/dist/katex.min.js",
  dataType: "script",
  cache: true
});
$.ajax({
  url: "//cdn.jsdelivr.net/npm/katex/dist/contrib/auto-render.min.js",
  dataType: "script",
  cache: true
});

$(window).on("load", function () {
  renderMathInElement(document.body,
    {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ]
    }
  );
});


