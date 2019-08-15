  

$("<link>").attr({ href: "//cdn.jsdelivr.net/npm/prismjs/themes/prism-tomorrow.css", rel: "stylesheet" }).appendTo("head");

$("<link>").attr({ href: "//cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.css", rel: "stylesheet" }).appendTo("head");

$("<link>").attr({ href: "//cdn.jsdelivr.net/npm/prismjs/plugins/toolbar/prism-toolbar.css", rel: "stylesheet" }).appendTo("head");


$('pre').addClass("line-numbers");


Prism.plugins.toolbar.registerButton('show-language', {
  text: '猜猜这是什么语言？', // required
  onClick: function (env) { // optional
    alert('用的是' + env.language);
  }
});


Prism.plugins.toolbar.registerButton('select-code', function (env) {
  var button = document.createElement('button');
  button.innerHTML = '选中这段代码？';
  button.addEventListener('click', function () {
    // Source: http://stackoverflow.com/a/11128179/2757940
    if (document.body.createTextRange) { // ms
      var range = document.body.createTextRange();
      range.moveToElementText(env.element);
      range.select();
    } else if (window.getSelection) { // moz, opera, webkit
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(env.element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
  return button;
});


Prism.plugins.autoloader.languages_path = '//cdn.jsdelivr.net/npm/prismjs/components/';


