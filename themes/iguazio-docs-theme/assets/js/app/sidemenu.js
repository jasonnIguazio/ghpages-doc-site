/* == sidemenu.js == */
// [INFRA-VERSION-SITE] [ci-versioned-site-version-selection] Edited (see also
// the side-menu.html Hugo partial).

// Set side menu
function setSideMenu() {
  var subSideMenu = $('.side-menu-list').find('.side-menu-sub');

  if (window.location.protocol === 'file:') {
    var splitThePath = thePath.split('/');
    thePath = '/' + splitThePath.slice(numberOfIndexInArray(offlineSiteDirName,splitThePath) + 1, splitThePath.length - 1).join('/') + '/index.html';
  }

  subSideMenu.hide();

  $('#side-menu-expand').click(function() {
    $('.expand').show();
    $('.collapse').hide();
    subSideMenu.show();

    $('.side-menu-list').each(function(i, el) {
      var parentUrl = $(el).data('url-parent');
      var menuList = $(".side-menu-list[data-url-parent=\"" + parentUrl + "\"]");
      menuList.parents("ul").siblings().find("i.fas.fa-plus-square").addClass("fa-minus-square");
      menuList.parents("ul").siblings().find("i.fas.fa-plus-square").removeClass("fa-plus-square");
      menuList.children("ul").siblings().find("i.fas.fa-plus-square").removeClass("fa-plus-square");
      menuList.children("ul").siblings("p.side-menu__item__link").find("i").addClass("fa-minus-square");
    });
  });

  $('#side-menu-collapse').click(function() {
    $('.collapse').show();
    $('.expand').hide();
    subSideMenu.hide();

    $('.side-menu-list').each(function(i, el) {
      var parentUrl = $(el).data('url-parent');
      var menuList = $(".side-menu-list[data-url-parent=\"" + parentUrl + "\"]");

      menuList.parents("ul").siblings().find("i.fas.fa-minus-square").addClass("fa-plus-square");
      menuList.parents("ul").siblings().find("i.fas.fa-minus-square").removeClass("fa-minus-square");
      menuList.children("ul").siblings().find("i.fas.fa-minus-square").removeClass("fa-minus-square");
      menuList.children("ul").siblings("p.side-menu__item__link").find("i").addClass("fa-plus-square");
    });
  });

  $(".fas.fa-plus-square, .fas.fa-minus-square").click(function() {
    var parentUrl = $(this).parent().parent().data("url-parent");
    $(".side-menu-list[data-url-parent=\"" + parentUrl + "\"]").find('ul').first().toggle('show');
    $(this).toggleClass('fa-plus-square');
    $(this).toggleClass('fa-minus-square');
  });

  showActiveMenuItems();
  highlightActiveMenuItems();

  // Toggle side-menu
  $(".hamburger-side-menu").click(function () {
    $("#side-menu").toggle();
    $("#side-menu").toggleClass('mobile');
    $(".content").toggleClass("wide-width");
    $(".home-content").toggleClass("wide-width");
    $(".toc").toggleClass("wide-width");
  });

  $("#side-menu-hide").click(function () {
    $(".side-menu-show").show();
    $("#side-menu").hide();
    $(".content").addClass("wide-width");
    $(".home-content").addClass("wide-width");
    $(".toc").addClass("wide-width");
  });

  $(".side-menu-show").click(function () {
    $(".side-menu-show").hide();
    $("#side-menu").show();
    $(".content").removeClass("wide-width");
    $(".home-content").removeClass("wide-width");
    $(".toc").removeClass("wide-width");
  });

  $(window).resize(function() {
    if (window.innerWidth > 1024) {
      $('#side-menu').show();
      $('#side-menu').removeClass('mobile');
    }
    else {
      $('#side-menu').hide();
    }
  }).resize();

  function showActiveMenuItems() {
    $('.side-menu-list').each(function(i, el) {
      thePath = thePath.replace(/\/\/|\/index\.html/g, '/');
      var parentUrl = $(el).data('url-parent');
      var menuList = $(".side-menu-list[data-url-parent=\"" + parentUrl + "\"]");

      $(el).toggleClass("hide");

      if (parentUrl.replace('/index.html', '') === thePath) {
        menuList.parents("ul").show();
        menuList.children("ul").show();
        menuList.parents("ul").siblings().find("i.fas.fa-plus-square").toggleClass("fa-minus-square").toggleClass("fa-plus-square");
        menuList.parents("ul").siblings().find("i.fas.fa-plus-square").toggleClass("fa-plus-square").toggleClass("fa-minus-square");
        menuList.children("ul").siblings().find("i.fas.fa-plus-square").toggleClass("fa-plus-square").toggleClass("fa-minus-square");
        menuList.children("ul").siblings().find("i.fas.fa-plus-square").toggleClass("fa-plus-square").toggleClass("fa-minus-square");
      }
    });
  }

  function highlightActiveMenuItems() {
    var thePathHandle = thePath.indexOf('?') !== -1
      ? thePath.slice(0, thePath.indexOf('?'))
      : thePath.indexOf('#') !== -1
      ? thePath.slice(0, thePath.indexOf('#'))
      : thePath;
    var activeItem = $("a.side-menu__item__link__text[data-url-info=\"" + thePathHandle +"\"]");
    var immediateActiveParent = activeItem.closest('.side-menu-list').parent().closest('.side-menu-list');
    var nextActiveParent = immediateActiveParent;

    activeItem.addClass('active');
    activeItem.siblings('i').addClass('active');

    while (nextActiveParent.length !== 0) {
      var activeTopic = nextActiveParent.children('.side-menu__item__link').children('.side-menu__item__link__text');

      activeTopic.addClass("active-topic");
      activeTopic.siblings('i').addClass("active");

      nextActiveParent = nextActiveParent.parent().closest('.side-menu-list');
    }

    setTimeout(function () {
      if (activeItem[0]) {
        if (immediateActiveParent[0]) {
          immediateActiveParent[0].scrollIntoView();

          if (activeItem[0].getBoundingClientRect().bottom > window.innerHeight) {
            activeItem[0].scrollIntoView();
          }
        } else {
          activeItem[0].scrollIntoView();
        }
      }
    });
  }
}
