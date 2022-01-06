/* == code-block.js == */

// Create code blocks when this code is present
function codeBlock() {
  $('.highlight').each(function(i, block) {
    var codeText = $(block).find('td:last-child').text() ||  $(block).text();
    codeText = codeText.split('\'').join('&#39;');
    codeText = codeText.split('"').join('&quot;');
    $(block).append('<div class="copy-button" data-clipboard-text="' + codeText + '">'
      + '<p class="copy"><span class="tooltiptext">Copy</span><i class="far fa-lg fa-copy" aria-hidden="true"></i></p>'
      + '<p class="copied">' + '<i class="fas fa-lg fa-check" aria-hidden="true"></i>&nbsp;Copied to clipboard</p>'
      + '</div>');
  });

  $('.chroma table td button').hide();

  $('.tab-content .tab-pane').each(function(idx, item) {
    var navTabs = $(this).closest('.code-tabs').find('.code-nav'),
      title = $(this).attr('title');
    if (navTabs.html().indexOf('name="' + title) == -1) {
      navTabs.append('<li><a href="" name="' + title + '">'+ title +'</a></li>');
    }
  });

  $('.code-tabs ul.code-nav, .tab-content').each(function(i, el) {
    $(el).find("li:first").addClass('active');
    $(el).find("div:first").addClass('active');
  });

  $('.code-nav a').click(function(e){
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest('.code-tabs'),
      tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
    tabPanel.find('.active').removeClass('active');
    tab.addClass('active');
    tabPane.addClass('active');
  });

  new Clipboard('.copy-button');

  $('.copy-button').click(function() {
    var copiedMessageTimeout = 1500; // "copied" message timeout in milliseconds
    var self = this;
    $(self).addClass('clicked');

    window.setTimeout(function() {
      $(self).removeClass('clicked');
    }, copiedMessageTimeout);

  });

}
