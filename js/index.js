/*** Detect the browser's prefixes ***/ 
if(document.addEventListener){ // Only IE9+ support this ;)
  // http://davidwalsh.name/vendor-prefix
  // Can't use it in IE8- as it brakes the page...
  var isPrefixed = (function () {
    var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('') 
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1],
      dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  })();

  // Deals with prefixes
  var prefix = isPrefixed.css;

} else {
  var prefix = "";
}

/*** Slides ***/
var currentSlide = 0,
    totalSlides  = $(".tl-item").length - 1;

// Creates the navigation
$(".timeline").after("<div class='tl-nav-wrapper'><ul class='tl-nav'></ul></div>");
$( ".tl-copy" ).wrapInner( "<div class='tl-copy-inner'></div>");

// Cicle through items and creates the nav
$(".tl-item").each(function(i) {
  var year = $(".tl-item:eq(" + i + ")" ).data("year");
  $(".tl-nav").append("<li><div>" + year + "</div></li>");
  
  // Click handlers
  $(".tl-nav li:eq(" + i + ")").click(function() {
    if(!$(".tl-item:eq(" + i + ")" ).hasClass("tl-active")) {
      // Activates the item
      $(".tl-item").removeClass("tl-active");
      $(".tl-item:eq(" + i + ")" ).addClass("tl-active");
      currentSlide = i;

      // Activates the item nav
      $(".tl-nav li").removeClass("tl-active");
      $(".tl-nav li:eq(" + i + ")" ).addClass("tl-active");
    }
  });
});

// Activates the first slide
$(".tl-item:first, .tl-nav li:first").addClass("tl-active");
  
/*** Nav ***/
// The nav's width
var navWidth = ($(".tl-nav li").outerWidth(true) * $(".tl-nav li").length) + 36;
$(".tl-nav").width(navWidth);

/*** The timeline's height ***/
var vpHeight  = $(window).height();
var tlHeight = vpHeight - $(".tl-nav-wrapper").outerHeight(true) - 0;
$(".tl-wrapper").height(vpHeight);
$(".tl-item").css("max-height", tlHeight);
$(".tl-item").height(tlHeight);

/*** Nav's navigation... ***/
var navTranslation = 0;
var navLimit = (navWidth - $(".tl-nav-wrapper").outerWidth(true) + 20) * -1;
