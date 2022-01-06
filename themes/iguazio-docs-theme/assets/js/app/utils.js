/* == utils.js == */

function numberOfIndexInArray(str, arr) {
  return arr.findIndex(_strCheck);
  function _strCheck(el) {
    return el.match(str);
  }
}

function fixUrl(url) {
  url = baseURL + url.replace(/^(\.{1,2}\/)+|^\/|localhost:\d+\//g, '');

  if (window.location.protocol === 'file:') {
    url = url.replace(/\/indexhtml|\/index\.html|\/\\/g, '/');
    var splitUrl;

    if (url.includes("/?")) {
      splitUrl = url.split("?");
      url = splitUrl[0] + 'index.html?' + splitUrl[1];
    } else if (url.search('/#') !== -1) {
      splitUrl = url.split('#');
      url = splitUrl[0] + 'index.html#' + splitUrl[1];
    }  else {
      url.slice(-1) !== '/' ? url += '/index.html' : url += 'index.html';
    }
  }

  return url;
}

// scrolls the page to anchor link considering the height of the top-menu
function scrollToAnchor(animationDelay) {
  $('html,body').animate({
    scrollTop: $(location.hash).offset().top - $('.top-menu').outerHeight()
  }, animationDelay);
}

function getVersionsList() {
  return $.getJSON(sharedVersionsFileURL)
          .then(function (data) {
            try {
              return JSON.parse(atob(data.content)).versions;
            } catch (error) {
              throw new Error('Cannot parse dynamic product-versions data')
            }
          })
          .catch(function (error) {
            throw new Error(error);
          });
}

function getFallbackVersionsList() {
  return $.getJSON(baseURL + backupVersionsFile)
          .catch(function (error) {
            console.error(error);
          })
}

function getSearchQueryParameters() {
  var queries = {};
  var queryStrings = decodeURIComponent(document.location.search.substr(1)).split('&');

  $(queryStrings).each(function(_, string) {
    var query = string.split('=');

    query[0] && query[1] && (queries[query[0].toString()] = query[1]).toString();
  });

  return queries;
}

function encodeAndFixUrl(el) {
  var hyperLink = $(el).attr('href');

  if (hyperLink && hyperLink.includes('/?')) {
    var [link, params] = hyperLink.split('?');
    var [queryParams, externalHash, internalHash] = params.split('#');
    var encodedQueryParams = encodeURIComponent(queryParams);
    var encodedExternalHash = externalHash ? encodeURIComponent('#' + externalHash) : '';

    internalHash = internalHash ? '#' + internalHash : '';
    hyperLink = link + '?' + encodedQueryParams + encodedExternalHash + internalHash;
  }

  if (hyperLink && hyperLink.indexOf(':') === -1 && hyperLink.substring(0, 1) !== '#') {
    hyperLink = fixUrl(hyperLink);
    $(el).attr('href', hyperLink);
  }
}
