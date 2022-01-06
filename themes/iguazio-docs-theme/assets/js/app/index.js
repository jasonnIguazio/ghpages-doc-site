/* == index.js == */

/* @flow */

// $(window).on('load', documentReady);
$(document).ready(function() {
  documentReady();
});

window.onhashchange = function() {
  scrollToAnchor(0);
};

var thePath,
    splitThePath,
    queryParameters = getSearchQueryParameters();

if (window.location.protocol === 'file:') {
  var indexOfflineDirName = window.location.href.indexOf(offlineSiteDirName);
  var offlineDirNameLength = offlineSiteDirName.length;
  baseURL = window.location.href.slice(0, indexOfflineDirName + offlineDirNameLength) + '/';
}
else if (baseURL === 'localhost') {
  baseURL = window.location.origin + '/';
}
else {
  baseURL = window.location.protocol + '//' + baseURL;
}

function documentReady() {
  thePath = window.location.href.replace(baseURL, '/').split('#')[0];
  splitThePath = thePath.split('/');

  setVersionedBox();
  setSideMenu();
  buildMiniToc();
  codeBlock();
  buildSearch();

  if (window.location.protocol === 'file:') {
    thePath = splitThePath.slice(numberOfIndexInArray(offlineSiteDirName, splitThePath) + 1, splitThePath.length - 1)
      .join('/') + '/index.html';
    $('.menu-pages a, .home-content a.internal-link').each(function(i, el) {
      var fixHref = $(el).attr('href') + 'index.html';
      $(el).attr('href', fixHref);
    });
  }

  if (!$('.docs-home').attr('is-external') && (window.location.href === baseURL || window.location.href === baseURL + 'index.html')) {
    $('.docs-home').addClass('active');
  }

  if (window.location.hash.match('#')) {
    setTimeout(function() {
      scrollToAnchor(20);
    }, 0);
  }

  if (queryParameters.target && queryParameters.link) {
    setTimeout(function () {
      $('iframe[name="' + queryParameters.target + '"]').attr('src', queryParameters.link);
    }, 10);
  }

  // Add heading-anchor links
  $('.doc-content a, h1, h2, h3, h4, h5, h6').each(function(i, el) {
    if ($(el).parent().get(0).tagName !== 'FIGCAPTION' && $(el).prop('localName').match(/h[1-6]/g)) {
      $(el).append('<a class="heading-anchor" href="' + '#' + $(el).attr('id') + '">'
        + '<i class="fas fa-link" aria-hidden="true"></i></a>');
    }
    else {
      encodeAndFixUrl(el);
    }

    if (
      el.tagName === 'A' &&
      $(el).attr('href') &&
      !$(el).attr('href').startsWith(baseURL) &&
      !$(el).attr('href').startsWith('..')
    ) {
      $(el).attr('target', '_blank');
    }
  });

  $('.home-content a').each(function(_, el) {
    encodeAndFixUrl(el);
  });

  $('a').filter(function() {
    return this.getAttribute('href') !== null && this.getAttribute('href').search(/^#.+/) !== -1;
  }).click(function(event) {
    event.preventDefault();
    location.hash = this.hash.replace(/.+(#.+?)$/, '$1');
    scrollToAnchor(0);
  });

  $('.top-menu-main-item').each(function(i, el) {
    var parentUrl = $(el).data('url-parent');
    var firstPartUrlMenu = parentUrl ? parentUrl.split('/')[1] : null;
    if (firstPartUrlMenu === thePath.split('/')[1] || (parentUrl === '/' && (thePath === '' || thePath === '/index.html'))) {
      $(el).addClass('active');
    }
  });

  $('.left .hamburger-side-menu').click(function() {
    var firstPartUrl = thePath.split('/')[1];
    $('.right-nav-menu').hide('slide');
    $('li.item').each(function(i, el) {
      var firstPartUrlMenu = $(el).data('url').split('/')[1];
      if (firstPartUrl === firstPartUrlMenu) {
        $(el).children().addClass('active');
      } else {
        $(el).children().removeClass('active');
      }
    });
  });

  $('.right .hamburger-right-menu').click(function() {
    $('.right-nav-menu').toggle('slide');
  });

  $('.right-nav-menu .close-icon').click(function() {
    $('.right-nav-menu').hide('slide');
  });

  $('.breadcrumbs li a').each(function(i, el) {
    var fixedHref = decodeURI($(el).attr('href')).replace(/\/\\|\\/g, '/');
    if (window.location.protocol === 'file:') {
      fixedHref += 'index.html';
    }
    $(el).attr('href', fixedHref);
  });

  $('#scroll-top').click(function() {
    $('html,body').animate({
      scrollTop: 0
    }, 700);
  });

  $('.search-icon').click(function() {
    $('.top-menu .search-block').toggle();
    $('.hamburger-right-menu').toggle();
    $('.home-links').toggleClass('hidden');
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({
      container: 'body'
    });
  });
}
