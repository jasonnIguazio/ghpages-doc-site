/* == search.js == */

// Search function
function buildSearch() {
  var idx = {},
      allContent = [],
      inlineSearchResults = [],
      selectedInlineResultIndex = -1,
      searchSection = '/';

  if (window.location.protocol !== 'file:') {
    $.getJSON(baseURL + 'index.json', function(data) {
      allContent = data;

      initializeLunr();
    }, function(error) {
      console.error(error);
    });
  }
  else {
    // For using site in file: protocol
    allContent = index;

    initializeLunr();
  }

  setSearchInputTooltip();

  $('.search-options').on('click', setSearchSection);

  // Key-pressed behavior
  $('.search-field').keydown($.debounce(250, function(event) {
    if (event.keyCode === 27 || event.keyCode === 13 || event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 9) {
      return;
    }
    runSearch();
  }));

  // Key pressed
  $('.search-field').keyup(function(e) {
    // ESCAPE key (Esc)
    if (e.keyCode === 27) {
      $('.inline-search-results').removeClass('active');
      $('.search-field').val('');
      $('.search-field').blur();
    }
    // Up arrow
    if (e.keyCode === 38) {
      selectPrevious();
    }
    // Down arrow or Tab
    if (e.keyCode === 40 || e.keyCode === 9) {
      selectNext();
    }

    // Enter key
    if (e.keyCode === 13) {
      if (selectedInlineResultIndex < 0) {
        var searchPage = window.location.protocol === 'file:' ? 'search/index.html?find=' : 'search?find=';
        window.location = baseURL + searchPage + $(this).val() + '&section=' + searchSection;
      }
      else {
        window.location = fixUrl(inlineSearchResults[selectedInlineResultIndex].path);
      }
    }
  });

  function initializeLunr() {
    var addDocPromises = [];

    setIds(allContent);

    idx = lunr(function() {
      var self = this;

      self.ref('id');
      self.field('title');
      self.field('keywords');
      self.field('content');

      allContent.forEach(function(doc) {
        var addDocPromise = new Promise(function(resolve) {
          setTimeout(function() {
            self.add(doc);
            resolve();
          }, 40);
        });

        addDocPromises.push(addDocPromise)
      });

      Promise.all(addDocPromises).then(function() {
        addDocPromises = [];

        if (window.location.search) {
          onSearchPage();
        }
      });
    });
  }

  // Set IDs for data
  function setIds(data) {
    data.forEach(function(dataPoint, i) {
      dataPoint.id = i;
    });
  }

  function setSearchSection(data) {
    // `data` can be either Mouse Click Event or passed selected section

    var currentActiveSectionItem = $('.search-options a.active');
    var newActiveSectionItem = typeof data === 'string' ? $('.search-options a[data-value="' + data + '"]') : $(event.target).closest('a');

    searchSection = newActiveSectionItem.attr('data-value');

    currentActiveSectionItem.removeClass('active');
    newActiveSectionItem.addClass('active');

    runSearch();
  }

  function onSearchPage() {
    var searchText,
        searchSectionName,
        getResult;

    // If query string is there, try to search
    if (queryParameters.section) {
      searchText = queryParameters ? decodeURI(queryParameters.find).replace(/^"|"$/g, '') : null;
      searchSection = queryParameters.section;
      searchSectionName = $('.search-options a[data-value="' + searchSection + '"]').text().replace('Search in ', '');

      setSearchSection(searchSection);
      $('.search-field').val(searchText);
      $('#search-text').text('"' + searchText + '"');
      $('#search-section-name').text('in ' + searchSectionName);

      getResult = getSearchResults(searchText, searchSection);
      if (getResult) {
        getResult.forEach(function(searchResult) {
          $('.search-result-items').append(buildSearchItemHtml(searchResult));
        });
      }
      else {
        $('.search-result-items').append('Your search for <b>\"' + searchText.replace(/"/g, ' ')
          + '\"</b> did not return any results.<br /><br />Please check your spelling or try another search term.');
      }

      setSearchInputTooltip();
    }
  }

  function buildSearchItemHtml(searchResult) {
    var content = searchResult.content && searchResult.content.search(/\w|\d/) !== -1 ? searchResult.content : 'No content';
    return '<a href=\"' + fixUrl(searchResult.path) + '" class=\"search-result-link"><h4>' + searchResult.title + '</h4><p class=\"searchContent\">' + content + '</p></a>';
  }

  function runSearch() {
    var currentValue = $('.search-field').val(),
        searchPage,
        showMores;

    selectedInlineResultIndex = -1;

    // Find inline search results
    inlineSearchResults = getSearchResults(currentValue, searchSection);
    if (inlineSearchResults.length > 0) {
      $('.inline-search-results').addClass('active');
      $('.inline-search-results ul').empty();
      inlineSearchResults = inlineSearchResults.slice(0, 5);
      searchPage = window.location.protocol === 'file:' ? 'search/index.html?find=' : 'search?find=';
      showMores = {
        path: searchPage + currentValue + '&section=' + searchSection,
        title: 'Show more results ...',
        content: 'false'
      };
      inlineSearchResults.push(showMores);
      inlineSearchResults.forEach(function(searchResult) {
        var inlineItemHtml = buildInlineSearchItem(searchResult);
        $('.inline-search-results ul').append(inlineItemHtml);
      });
    }
    else {
      $('.inline-search-results').removeClass('active');
    }

    setSearchInputTooltip();
  }

  function buildInlineSearchItem(searchResult) {
    var path = searchResult.id ? fixUrl(searchResult.path) : baseURL + searchResult.path,
      text = searchResult.content;

    if (text === 'false') {
      text = '';
    }
    else if (text && text.search(/\w|\d/) === -1) {
      text = 'No content';
    }

    return '<li><a href="' + path + '"><h3 class="title">' +
      searchResult.title + '</h3><p class="text">' +
      text + '</p></a></li>';
  }

  function selectNext() {
    selectedInlineResultIndex = (selectedInlineResultIndex + 1) % inlineSearchResults.length;
    setSelected(selectedInlineResultIndex);
  }

  function selectPrevious() {
    if (selectedInlineResultIndex === 0) {
      selectedInlineResultIndex = inlineSearchResults.length - 1;
    }
    else {
      selectedInlineResultIndex = (selectedInlineResultIndex - 1) % inlineSearchResults.length;
    }

    setSelected(selectedInlineResultIndex);
  }

  function setSelected(index) {
    $('.inline-search-results ul li').each(function(i) {
      $(this).removeClass('selected');
      if (index === i) {
        $(this).addClass('selected');
      }
    });
  }

  function getSearchResults(searchText, searchSection) {
    var pageResults = [],
        page;

    searchText = searchText.replace(/^"|"$/g, '');
    if (searchText) {
      var searchResults = idx.search(searchText);
      searchResults.forEach(function(searchResult) {
        allContent.forEach(function(doc) {
          if (doc.id === Number(searchResult.ref)) {
            page = JSON.parse(JSON.stringify(doc));
          }
        });
        page.path = page.path.replace(/\s+/g, '-');
        page.title = page.title ? page.title.replace(/"/g, '') : 'No title';
        page = markSearchedText(page, searchText);

        if (searchSection && searchSection !== '') {
          if (fixUrl(page.path).indexOf(searchSection) === -1) return;
        }
        pageResults.push(page);
      });
    }
    pageResults = pageResults.length > 0 ? pageResults : false;
    return pageResults;
  }

  function markSearchedText(page, text) {
    var modifiedText = '<b>' + page.title.slice(page.title.search(new RegExp(text, 'i')), page.title.search(new RegExp(text, 'i')) + text.length) + '</b>';
    page.title = page.title ? page.title.replace(new RegExp(text, 'i'), modifiedText) : 'No title';
    var searchedTextIndex = page.content.search(new RegExp(text, 'i'));
    if (searchedTextIndex !== -1) {
      var modifiedContent = '<b>' + page.content.slice(page.content.search(new RegExp(text, 'i')), page.content.search(new RegExp(text, 'i')) + text.length) + '</b>';
      page.content = page.content.slice(Math.max(0, searchedTextIndex - 100), searchedTextIndex) +
        modifiedContent + page.content.slice(searchedTextIndex + text.length, searchedTextIndex + 100);
    }
    else {
      page.content = page.content.slice(0, 200);
    }
    return page;
  }

  function setSearchInputTooltip() {
    var selectedSearchOption = $(".search-options a.active").text();

    $('.search-field').attr('data-original-title', selectedSearchOption)
  }
}
