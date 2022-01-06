/* == mini-toc.js == */

// Create a custom page TOC ("mini TOC")
function buildMiniToc() {
  // JS custom mini ToC
  var ToC;
  $('.content h2').each(function (i, el) {
    // [InfraInfo] [ci-custom-mini-toc-html-tags-in-heading] Replace &lt;` and
    // `&gt;` instances in the HTML heading with `<` and `>` to support use of
    // these character entities in the original heading text, and avoid
    // interpreting the entities as actual HTML tags.
    // [ci-custom-mini-toc-html-tags-in-heading-escaped-lt-n-gt-chars] The
    // current drawback to this solution is that escaped `\&lt;` or `\&gt;`
    // character entities in the original heading text will appear in our
    // mini-TOC entry as `<` and `>` instead of `&lt;` and `&gt;`.
    // See https://github.com/iguazio/docs-infra/pull/177.
    var title = $(el).text().replace(/</g, '&lt;').replace(/>/g, '&gt');
    var link = '#' + $(el).attr('id');
    ToC = '<li><a href="' + link + '">' + title + '</a></li>';

    // Display the mini TOC only if page has TOC-level headings (currently, h2)
    $('ul.toc-js').append(ToC);
  });

  $(".mini-toc-header").click(function() {
    $("#TableOfContents").slideToggle(200);
    $(".mini-toc i").toggleClass("fa-caret-right");
    $(".mini-toc i").toggleClass("fa-caret-down");
  });

  $(window).scroll(function() {
    var windScroll  = $(this).scrollTop();
    windScroll > 200 ? $('#scroll-top').show() : $('#scroll-top').hide();
    if (windScroll) {
      $(".doc-content > h2, h3, h4").each(function() {
        if ($(this).position().top <= windScroll + 56) {
          var activeHeader = $("#TableOfContents").find('[href="#' + $(this).attr('id') + '"]');

          if (activeHeader.length) {
            $("#TableOfContents").find("a").removeClass("active");
            activeHeader.addClass("active");
          }
        }
      })
    }
  }).scroll();

  $(window).resize(function() {
   if ( $(window).width() > 1143 ){
       $('.mini-toc-header i').removeClass('fa-caret-right').addClass('fa-caret-down');
       $('#TableOfContents').show();
   } else {
       $('.mini-toc-header i').removeClass('fa-caret-down').addClass('fa-caret-right');
       $('#TableOfContents').hide();
   }
  }).resize();

}
