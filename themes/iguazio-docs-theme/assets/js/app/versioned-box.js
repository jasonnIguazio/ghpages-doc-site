function setVersionedBox() {
  getVersionsList()
    .then(function (versionsList) {
      generateVersionsDropdown(versionsList, true);
    })
    .catch(function () {
      getFallbackVersionsList()
        .then(function (data) {
          generateVersionsDropdown(data.versions);
        })
    });

  function generateVersionsDropdown(versionsList, isSharedVersionsList) {
    var versionBox = $('#version-box');

    if (versionBox.length !== 0 && versionsList.length !== 0) {
      if (versionsList.length > 1) {
        var currentVersion = $(".dropdown-toggle.igz_version-btn").data('current-version');

        $('#product-versions-dropdown').show();
        $('#igz_version-text').hide();

        versionsList.forEach(function (version, index) {
          var pathname = '';
          var search = '';
          let [versionInt, versionFloat] = String(version).split('.');
          let [currentVersionInt, currentVersionFloat] = String(currentVersion).split('.');

          if (Number(versionInt) >= Number(currentVersionInt) && Number(versionFloat) >= Number(currentVersionFloat)) {
            pathname = window.location.pathname;
            search = window.location.search;
            var versionRegExp = /\/(latest-release|v\d+.\d+)\//g;
            var versionResult = versionRegExp.exec(pathname);

            if (window.location.protocol === 'file:') {
              pathname = thePath.replace(/(\/)?\/index\.html/g, '');
            } else if (versionResult && versionRegExp.lastIndex !== 0) {
              pathname = '/' + pathname.slice(versionRegExp.lastIndex);
            }
          }

          var isLatestRelease = isSharedVersionsList && index === 0;
          var linkElement = $("<a></a>")
            .text('Version ' + version + (isLatestRelease ? ' (Latest Release)' : ''))
            .addClass('dropdown-item')
            .attr('data-version', version)
            .attr('href', versionBox.attr('data-home-url') + (isLatestRelease ? 'latest-release' : 'v' + version) + pathname + search)
            .click(function (event) {
              if (window.location.hash && parseFloat(event.target.dataset.version) >= currentVersion) {
                event.preventDefault();

                window.location.href = event.target.href + window.location.hash;
              }
            });

          $('.version-dropdown-menu')[0].append(linkElement[0]);
        });
      } else {
        $('#product-versions-dropdown').hide();
        $('#igz_version-text').show();
      }

      versionBox.show();
    }
  }
}

