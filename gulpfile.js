// TODO: Instead of dedicated xxxInternal config-build.toml keys, consider
// using a single internalID config-build.toml key.

/* File: gulpfile.js */
// NOTE: 
// - Default string configurations are done in config-build.toml and
//   config-shared.toml.
// - For full usage instructions, see the `help` task and the tasksInfoXXX
//   constants that it uses.
// - Some CLI options have environment-variable equivalents:
      /*
      Environment Variables       Gulp-Option Counterparts
      =====================       ========================
      IGZ_BUILD_EXEC              --buildExec
      IGZ_BUILD_INTERNAL          --internal | --igzBuildInternal
      IGZ_OFFLINE_SITE_DIR        --offlineDir
      IGZ_OFFLINE_SITE_DIR_NAME   --offlineDirName

      Hugo Environment Variables
      --------------------------
      HUGO_BUILDDRAFTS            --D|--buildDrafts
      HUGO_BUILDEXPIRED           --E|--buildExpired
      HUGO_BUILDFUTURE            --F|--buildFuture
      */

//////////////////////////////
// Gulp Variables

// Grab Gulp packages
const gulp  = require('gulp');
const argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const each = require('gulp-each');
const exec = require('child_process').exec;
const fs = require('fs');
const merge = require('merge-stream');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sequence = require('run-sequence');
const shell = require('gulp-shell');
const tomlRequire = require('toml-require').install();
const zip = require('gulp-zip');

// Custom global variables
var archiveSrcDir;
var autogenHugoVarsFile;
var backupVersionsFile;
var baseUrl;
var baseUrlDir;
var buildExec;
var cleanDir;
var configBuild;
var configBuildOnlyFile;
var configHugoFiles;
var configHugoOnlyFiles;
var configShared;
var configSharedFile;
var contentDir;
var dataVarsShared;
var dataVarsSharedFile;
var isClean;
var isInternal;
var isOffline;
var jsVarsFile;
var localInternalSiteOutDir;
var localSiteOutDir;
var offlineInternalSiteDirName;
var offlineSiteDir;
var offlineSiteDirName;
var offlineSrcDir;
var outDirBase;
var port;
var publicSiteOutDir;
var relDocsHomeUrl;
var sharedVersionsFileURL;
var siteDir;
var stagingInternalSiteOutDir;
var stagingSiteOutDir;

// Tasks information (help-text) variables, used in the `help` task
// TODO: (sharonl)
// - Replace hardcoded configuration-file names (namely, config-build.toml)
//   and related default values, such as the port number, with variables. This
//   requires restructuring the file or duplicating related init code.
// - Consider editing the USAGE info to replace OPTIONS  with the list of
//   supported options (flags) and displaying the usage strings also when
//   running `gulp help` without any options. I made USAGE a separate array
//   item to support this or other usage-only implementations.
//
// Information (help text) for the main Gulp tasks
const tasksInfoMain = {
  'default': [
    `Default task - run the 'serve' and 'watch' tasks to serve the
    site locally and watch for changes; 'serve' runs 'hugo serve[r]'.`,
    `USAGE: gulp [OPTIONS]`,
    `NOTE: By default, the doc site is served locally on port 1313
      (http://localhost:1313/ = Hugo default), or on port 1314
      (http://localhost:1314) for internal builds (see --internal). This is
      configurable via -b|--baseURL or -p|--port.

OPTIONS:
  --buildExec string  - Hugo-binary path/name in $PATH (can also be set via
                        $IGZ_BUILD_EXEC); default: "hugo"
  --configBuild string - path to custom site build/serve configuration file
                        (used only by Gulp, not a Hugo file); default:
                        config-build.toml.
  --configShared string - path to custom shared Hugo and custom-build
                        configuration file; default: config-shared.toml.
  --internal | --igzBuildInternal - internal-site build, with comments etc.
                        (can also be set via $IGZ_BUILD_INTERNAL)

  Hugo 'serve' options (see 'hugo serve --help'), including these options:
  -b|--baseURL string - the served site's base URL; default: "localhost"
  --buildDrafts       - include draft content ('buildDrafts: true')
  --buildExpired      - include expired content ('expiryDate': <elapsed date>')
  --buildFuture       - include future-publication content
                        ('publishDate': <future date>')
  --cleanDestinationDir - remove files from destination not found in static
                        directories
  --config string     - path to Hugo configuration file(s); custom default
                        (overrides the Hugo default):
                        "config.toml, config-shared.toml"
  --configDir string  - path to configuration directory; default: "config"
  -c|--contentDir string - path to content directory; default: "content"
  --disableFastRender - enable full re-render on changes
  --disableLiveReload - watch without live browser reload on rebuild
  -l|--layoutDir string - path to layouts directory; default: "layouts"
  -p|--port int       - port to listen on; default: 1313/1314 (internal)
  -t|--theme string   - path to a theme directory in the themes directory;
                        default: 'Theme' value, set in the main Hugo
                        configuration file
  --themeDir string   - path to themes directory; default: "themes"`
  ],
  'build': [
    `Build the site according to the configured build type.`,
    `USAGE: gulp build [OPTIONS]`,
    `NOTE:
- By default, the task first runs the 'clean' task to clean the current
  build-output directory (if exists) before building; you can override this
  with the --noclean option.
- When using the -o|--offline option, the task runs a local build and then
  uses the 'gen-offline-site' to generate an offline site directory from the
  local-build directory. The current offline-site directory (if exists) is
  also cleaned first unless --noclean is set.
- --local, --pub, and --staging are mutually exclusive.

OPTIONS:
  --bdir string       - base-URL directory to append to the base-URL root;
                        default: build-type specific derived from
                        config-build.toml; (not applicable to offline)
  --buildExec string  - Hugo-binary path/name in $PATH (can also be set via
                        $IGZ_BUILD_EXEC); default: "hugo"
  --configBuild string - path to custom site build/serve configuration file
                        (used only by Gulp, not a Hugo file); default:
                        config-build.toml
  --configShared string - path to custom shared Hugo and custom-build
                        configuration file; default: config-shared.toml.
  --internal | --igzBuildInternal - internal-site build, with comments etc.
                        (can also be set via $IGZ_BUILD_INTERNAL)
  --noclean           - don't clean the current build-output directory (if
                        exists) before the build; default: clean
  --local             - local build (default); affects the default base URL
                        and build-output directory
  -o|--offline        - perform a local build and generate an offline site
                        from the local build directory, using the
                        'gen-offline-site' task
  --offlineDir string - offline-site directory path (can also be set via
                        $IGZ_OFFLINE_SITE_DIR); default: build-type specific
                        derived from config-build.toml; (applicable when
                        -o|--offline is set and -d|--destination isn't set)
  --offlineDirName string - name of an offline-site directory in the base
                        output directory (can also be set via
                        $IGZ_OFFLINE_SITE_DIR_NAME); default: build-type
                        specific derived from config-build.toml; (applicable
                        when -o|--offline is set and -d|--destination
                        --offlineDir aren't set)
  --outbase string    - path to the base output directory (the build
                        directory's parent); default: "out"; (applicable when
                        -d|--destination and -o|--offline + --offlineDir aren't
                        set)
  --pub               - public-site build; affects the default base URL,
                        build-output directory, and copied assets
  --staging           - staging-site build; affects the default base URL and
                        build-output directory
  -z|--zip            - Create a ZIP archive of the built site directory or
                        the generated offline-site directory in offline mode
                        (-o|--offline), using the 'zip' task

  Hugo build (default) options (see 'hugo --help'), including these options:
  -b|--baseURL string - the served site's base URL; default: "localhost"
  --buildDrafts       - include draft content ('buildDrafts: true')
  --buildExpired      - include expired content
                        ('expiryDate': <elapsed date>')
  --buildFuture       - include future-publication content
                        ('publishDate': <future date>')
  --cleanDestinationDir - remove files from destination not found in static
                        directories; relevant only with --noclean
  --config string     - path to Hugo configuration file(s); custom default
                        (overrides the Hugo default):
                        "config.toml, config-shared.toml"
  --configDir string  - path to configuration directory; default: "config"
  -c|--contentDir string - path to content directory; default: "content"
  -d|--destination string - path to the build-output directory; default:
                        build-type specific, derived from config-build.toml and
                        --outbase
  -l|--layoutDir string - path to layouts directory; default: "layouts"
  -t|--theme string   - path to a theme directory in the themes directory;
                        default: 'Theme' value, set in the main Hugo
                        configuration file
  --themeDir string   - path to themes directory; default: "themes"
  -w|--watch          - watch for changes and recreate the build as needed`
  ],
  'serve': [
    `Serve the site locally using the Hugo 'serve'|'server' command.`,
    `USAGE: gulp serve [OPTIONS]`,
    `NOTE: This task is executed from the 'default' task (with 'watch').
  
OPTIONS: See the 'default' task, which runs 'serve' and 'watch'.`
  ],
  'info': [
    `Display basic build and environment information (e.g., Hugo version).`,
    `USAGE: gulp info [OPTIONS]`,
    `NOTE: This task is executed from the 'build', 'default', and 'serve' tasks.

OPTIONS:
  --buildExec string  - Hugo-binary path/name in $PATH (can also be set via
                        $IGZ_BUILD_EXEC); default: "hugo"`
  ]
};
// Information (help text) for the secondary Gulp tasks
// NOTE: These tasks are executed from relevant main tasks (see the tasks doc).
const tasksInfoSecondary = {
  'clean': [
    `Clean the destination directory (default: the site build-output
    directory / offline-site directory in offline mode - -o|--offline or when
    executed from the 'gen-offline-site' task).`,
    `USAGE: gulp clean [OPTIONS]`,
    `NOTE: This task is executed from the 'build' and 'gen-offline-site' tasks,
      which can be avoided by setting --noclean for these tasks.

OPTIONS:
  -d|--destination string - path to the directory to clean; default: the
                        site-build output directory or the offline-site
                        directory when executed from 'gen-offline-site' / with
                        -o|--offline (see defaults for these tasks)
  --offlineDir string - path to an offline-site directory to clean (can also be
                        set via $IGZ_OFFLINE_SITE_DIR); default: build-type
                        specific derived from config-build.toml. When calling
                        'clean' directly, you can just use -d|--destination.
  --offlineDirName string - name of an offline-site directory in the base
                        output directory to clean (can also be set via
                        $IGZ_OFFLINE_SITE_DIR_NAME); default: build-type
                        specific derived from config-build.toml
  --outbase string    - path to the base output directory (the clean
                        directory's parent); default: "out"; (applicable when
                        -d|--destination and -o|--offline + --offlineDir aren't
                        set)`
  ],
  'copy-assets': [
    `Copy relevant assets (such as .htaccess files) to a destination
    directory (default: the site build-output directory).`,
    `USAGE: gulp copy-assets [OPTIONS]`,
    `NOTE: This task is executed from the 'build' task. The assets to copy are
      dependent on the build type (--local (Default) | --pub | --staging).
      Currently, this is applicable only to public-site builds (--pub) - used
      to copy relevant .htaccess files.

OPTIONS:
  -d|--destination string - path to the destination directory to which to copy
                        the assets; default: the default build output directory
                        (build-type specific, derived from config-build.toml
                        and --outbase)
  --outbase string    - path to the base output directory (the destination
                        directory's parent); default: "out"; (applicable when
                        -d|--destination isn't set)
  --pub               - public-site build; affects the default base URL,
                        build-output directory, and copied assets`
  ],
  'gen-offline-site': [
    `Generate an offline site from a local-build directory.`,
    `USAGE: gulp gen-offline-site [OPTIONS]`,
    `NOTE:
- This task is executed from the 'build' task.
- The name of the offline site directory (see --offlineDirName) for the
  offline-site generation must be identical to that used for the source local
  build. (With 'build -o|--offline', this is handled implicitly.)

OPTIONS:
  --internal | --igzBuildInternal - internal-site build, with comments etc.
                        (can also be set via $IGZ_BUILD_INTERNAL)
  --noclean           - don't clean the current offline-site directory (if
                        exists) before the build; default: clean
  --offlineDir string - offline-site directory path (can also be set via
                        $IGZ_OFFLINE_SITE_DIR); default: build-type specific
                        derived from config-build.toml
  --offlineDirName string - name of an offline-site directory in the base
                        output directory (can also be set via
                        $IGZ_OFFLINE_SITE_DIR_NAME); default: build-type
                        specific derived from config-build.toml
  --outbase string    - path to the base output directory (the parent of the
                        offline-site directory); default: "out"; (applicable
                        when --offlineDir isn't set)
  --src string        - path to a local-build site directory from which to
                        generate the offline site; default: build-type specific
                        derived from config-build.toml.
                        NOTE: When 'gen-offline-site' is executed from the
                        'build' task, if -d|--destination sets the path to the
                        local build directory, 'gen-offline-site' --src is
                        automatically set to the same path.`
  ],
  'zip': [
    `Create a ZIP archive of a destination directory (default: the build-output
    directory or an offline-site directory in offline mode - -o|--offline).`,
    `USAGE: gulp zip [OPTIONS]`,
    `NOTE: 
- The archive file is created in the parent directory of the archived
  destination directory and its name is derived from the name of the archived
  directory (<archived dir>.zip).
- This task is executed from the 'build' task when -z|--zip is set.

OPTIONS:
  -d|--destination string - path to a directory archive; (default: build-type
                        specific; derived from config-build.toml and --outbase
  -o|--offline        - archive an offline-site directory (configurable via
                        --offlineDir[Name]); (applicable when -d|--destination
                        isn't set)
  --offlineDir string - path to an offline-site directory to archive (can also
                        be set via $IGZ_OFFLINE_SITE_DIR); default: build-type
                        specific derived from config-build.toml; (applicable
                        when -o|--offline is set and -d|--destination isn't set)
  --offlineDirName string - name of an offline-site directory in the base output
                        directory to archive (can also be set via
                        $IGZ_OFFLINE_SITE_DIR_NAME); default: build-type
                        specific derived from config-build.toml; (applicable
                        when -o|--offline is set and -d|--destination
                        --offlineDir aren't set)
  --outbase  string   - path to the base output directory (the archived
                        directory's parent); default: "out"; (applicable when
                        -d|--destination and -o|--offline + --offlineDir aren't
                        set)`
  ]
};
// Information (help text) for the low-level auxiliary Gulp tasks
// NOTE: These tasks are intended mainly for use from other tasks. For relevant
// CLI options, see the task implementations and internal documentation.
const tasksInfoAux = {
  'gen-css': [
    `SASS task - generate CSS code from SCSS and third-party CSS files.`,
    `USAGE: gulp gen-css [OPTIONS]`,
    `NOTE: This task is executed from the 'watch' task, which is called from the
      'default' task.
      For more information and supported options, see the task implementation.`
  ],
  'gen-js-scripts': [
    `Generate an app.js theme JavaScript file from the theme's
    js/app/ files, and a vendor.js theme JavaScript file from third-party
    JavaScript library files`,
    `USAGE: gulp gen-js-scripts [OPTIONS]`,
    `NOTE: This task is executed from the 'build', 'serve', and 'watch' tasks, and
      from the 'default'task  via 'serve' and 'watch', and it executes the
      'gen-js-vendor' task.
      For more information and supported options, see the task implementation.`
  ],
  'gen-js-vendor': [
    `Generate a vendor.js theme JavaScript file from third-party
    JavaScript library files.`,
    `USAGE: gulp gen-js-vendor [OPTIONS]`,
    `NOTE: This task is executed from the 'gen-js-scripts' task.
      For more information and supported options, see the task implementation.`
  ],
  'set-global-js-vars': [
    `Define global JavaScript variables file.`,
    `USAGE: gulp set-global-js-vars [OPTIONS]`,
    `NOTE: This task is executed from the 'serve' and 'build' tasks, and from the
      'default' via 'serve'.
      For more information and supported options, see the task implementation.`
  ],
  'watch': [
    `Watch asset directories (such as CSS and JavaScript) for changes.`,
    `USAGE: gulp watch [OPTIONS]`,
    `NOTE:
- This task is executed from the 'default' task (with 'serve'), and executes
  the 'gen-css' and 'gen-js-scripts' tasks.
- Hugo source watch is done via the -w|--watch Hugo option, which is set by
  default for the Hugo 'serve[r]' command (see the 'serve' task).`
  ]
};
// Information (help text) for the help Gulp tasks
const tasksInfoHelp = {
  'list-tasks': [
    `List the names of the supported Gulp tasks.`,
    `USAGE: gulp list-tasks`,
    ``
  ],
  'help': [
    `Display help text (usage information).`,
    `USAGE:  
1. gulp help 
2. gulp help [--<task name> [--<task name> ...]]`,
    `NOTE: By default, 'gulp help', shows short descriptions of all supported tasks.

OPTIONS (USAGE #2):
  --<task name> - Display full help text for the specified task (<task name>).
                  <task name> can be any supported task (as returned by 'gulp
                  help' or 'gulp --list-tasks'), except for 'help', which is
                  reserved for general Gulp help.`
  ]
};
// Information (help text) for all "external" Gulp tasks
var tasksInfoAll = Object.assign({}, tasksInfoMain, tasksInfoSecondary, tasksInfoAux, tasksInfoHelp);
// Internal-tasks information (help text), for tasks that are designed to be
// called only from other tasks
// [InfraInfo] This constant is currently intentionally unused, as there's no
// need to include internal-task information in the Gulp usage help text.
const internalTasksInfo = {
  'create-offline-site': [
    `create-offline-site:  Create an offline site directory from a local-build site
    directory.`,
`  USAGE: gulp create-offline-site`,
`NOTE: This task is meant to be called only from the 'gen-offline-site' task.`
  ]
};
//////////////////////////////

//////////////////////////////
// Global Initialization
init();
//////////////////////////////

//////////////////////////////
// Gulp Functions

// Local-build site-directory configuration for offline-site builds
// [InfraInfo] (sharonl) This code is implemented in a function because it needs
// to be run both from init() and from `create-offline-site` (executed from
// `gen-offline-site`, which is also executed for `build -o|--offline`), because
// when `gen-offline-site` is called directly, $isOffline is set only after
// init().
function initOfflineLocalSiteDir() {
  if (argv['src']) {
    // Local sources directory for generating and offline site (can be
    // overridden with the --src CLI option)
    localSiteOutDir = argv['src'];
    if (isInternal) {
      localInternalSiteOutDir = argv['src']
    }
  } else {
    if (isInternal) {
      localInternalSiteOutDir = outDirBase + '/' + configBuild.buildType.offlineInternal.srcLocalDirName;
      localSiteOutDir = localInternalSiteOutDir;
    } else {
      localSiteOutDir = outDirBase + '/' + configBuild.buildType.offline.srcLocalDirName;
    }
  }
}

// Global-initialization function - initialize global Gulp variables
// [ci-init-output-eliminate-for-some-tasks] TODO: Eliminate the init() console
// output or overall call for relevant tasks, such as `help`.
function init() {
  // ****
  // Hugo executable binary path/name (in $PATH) for the build & serve tasks
  buildExec = "hugo";
  if (argv['buildExec']) {
    buildExec = argv['buildExec'];
  } else if (process.env.IGZ_BUILD_EXEC) {
    buildExec = process.env.IGZ_BUILD_EXEC;
  }
  // ****

  // ****
  // Configuration files

  // Shared data-variables file
  dataVarsSharedFile = "data/vars/shared.toml";
  dataVarsShared = require('./' + dataVarsSharedFile);

  // Custom build-only configuration file (used only by Gulp)
  configBuildOnlyFile = "config-build.toml";
  if (argv['configBuild']) {
    configBuildOnlyFile = argv['configBuild'];
  }
  console.log("[**IGUAZIO**] Custom build-only configuration file = '" + configBuildOnlyFile + "'");
  configBuild = require('./' + configBuildOnlyFile);

  // Product-versions JSON file - URL of updated shared GitHub file
  sharedVersionsFileURL = configBuild.sharedVersionsFileURL;
  // Product-versions JSON file - local repo backup
  backupVersionsFile = configBuild.backupVersionsFile;

  // Hugo-only configuration files
  configHugoOnlyFiles = "config.toml";
  if (argv['config']) {
    configHugoOnlyFiles = argv['config'];
  }
  console.log("[**IGUAZIO**] Hugo-only configuration files = '" + configHugoOnlyFiles + "'");

  // Shared Hugo and custom-build configuration file
  configSharedFile = "config-shared.toml";
  if (argv['configShared']) {
    configSharedFile = argv['configShared'];
  }
  console.log("[**IGUAZIO**] Shared configuration files = '" + configSharedFile + "'");
  configShared = require('./' + configSharedFile);

  // Gulp-generated build-specific Hugo data-variables file
  autogenHugoVarsFile = "./data/vars/build.toml";

  // Hugo configuration files (Hugo-only + shared configuration files)
  configHugoFiles = configHugoOnlyFiles + ',' + configSharedFile;
  console.log("[**IGUAZIO**] Hugo configuration files = '" + configHugoFiles + "'");

  // Gulp-generated global JavaScript variables definition file
  jsVarsFile = configBuild.themeDir + "/layouts/partials/func/set-javascript-vars.html";
  // ****

  // ****
  // Build parameters

  // Output-directory cleanup configuration
  isClean = true;
  if (argv['noclean']) {
    isClean = false;
  }

  // Internal-build configuration
  isInternal = false;
  if (argv['igzBuildInternal'] || argv['internal'] || (process.env.IGZ_BUILD_INTERNAL == "true")) {
    process.env.IGZ_BUILD_INTERNAL = "true";
    isInternal = true;
    console.log("[**IGUAZIO**] INTERNAL build");
  }
  // ****

  // ****
  // Content-type specific build configuration
  // Set Hugo content-type build environment variables based on CLI arguments
  // (the environment variables can also be set directly in the CLI environment,
  // for example, `HUGO_BUILDDRAFTS=true gulp`). We set the environment
  // variables here for use in the `set-global-js-vars` task, which defines
  // global buildDrafts, buildExpired, and buildFuture JavaScript variables
  // (currently // unused).

  // Draft content
  if (argv['buildDrafts'] || argv['D']) {
    process.env.HUGO_BUILDDRAFTS = 'true';
  }
  // Expired content
  if (argv['buildExpired'] || argv['E']) {
    process.env.HUGO_BUILDEXPIRED = 'true';
  }
  // Future content
  if (argv['buildFuture'] || argv['F']) {
    process.env.HUGO_BUILDFUTURE = 'true';
  }
  // ****

  // ****
  // Site URLs

  // Default relative docs-home URL for the current build
  // TODO: Consider adding an option for overriding relDocsHomeURL.
  relDocsHomeUrl = configBuild.buildType.local.relDocsHomeURL;
    // [ci-rel-docs-home-url-local-build] [InfraInfo] (sharonl) For local
    // builds, as there's no guarantee that a matching relative docs-home page
    // exists, I typically set relDocsHomeURL in config-build.toml to the
    // public ghpages-doc-site home page and to the development staging ghpages-doc-site home
    // page for internal builds; (I don't use the staging URL for external
    // builds because the link is also used in offline ghpages-doc-site builds, which
    // might reach customers).

  // Default site port
  port = configBuild.buildType.local.port;

  // Site base-URL initialization
  // [InfraInfo] Note that --baseURL and -b are Hugo flags.
  baseUrl = configBuild.buildType.local.baseURL;
  if (argv['baseURL']) {
    baseUrl = argv['baseURL'];
  } else if (argv['b']) {
    baseUrl = argv['b'];
  }
  else {
    // Set per build-type URLs
    baseUrlDir = argv['bdir'] ? argv['bdir'] : configBuild.onlineBaseURLDir;
      // --bdir is used only for for non-local builds.
    if (argv['pub']) {
      baseUrl = configBuild.buildType.production.baseURLRoot + baseUrlDir;
      relDocsHomeUrl = configBuild.buildType.production.relDocsHomeURL;
    } else if (argv['staging']) {
      if (isInternal) {
        baseUrl = configBuild.buildType.stagingInternal.baseURLRoot + baseUrlDir;
        relDocsHomeUrl = configBuild.buildType.stagingInternal.relDocsHomeURL;
      } else {
        baseUrl = configBuild.buildType.staging.baseURLRoot + baseUrlDir;
        relDocsHomeUrl = configBuild.buildType.staging.relDocsHomeURL;
      }
    } else if (isInternal) {
      baseUrl = configBuild.buildType.localInternal.baseURL;
      relDocsHomeUrl = configBuild.buildType.localInternal.relDocsHomeURL;
      port = configBuild.buildType.localInternal.port;
    }
  }
  // ****

  // ****
  // Site content directory
  // This value can be overridden with the --contentDir or -c CLI option.
  contentDir = "./content";
  if (argv['contentDir']) {
    contentDir = argv['contentDir'];
  } else if (argv['c']) {
    contentDir = argv['c'];
  }
  // ****

  // ****
  // Site build-output directories

  // Base output directory (the root build output directory)
  outDirBase = configBuild.baseOutDir;
  if (argv['outbase']) {
    outDirBase = argv['outbase'].replace(/\/$/, "");
  }

  // Default local (development) build output directory
  localSiteOutDir = outDirBase + "/" + configBuild.buildType.local.outDir + configBuild.dirSuffix;
  // Default staging-site build output directory
  // [InfraInfo] [c-staging-site-base-url] Currently, we develop the docs on a
  // dedicated "igzdocsdev" install on our WordPress web server, and use the
  // production ("live") environment of this install (igzdocsdev.wpengine.com)
  // for development. The Staging environment on this install
  // (igzdocsdev.staging.wpengine.com) is unused. Therefore, the configured
  // config-build.toml staging URLs are that of the production environment of
  // the doc-development install.
  stagingSiteOutDir = outDirBase + "/" + configBuild.buildType.staging.outDir + configBuild.dirSuffix;
  // Default internal local (development) build output directory
  // Default internal-build output directories
  // Default publication (production) site build output directory
  publicSiteOutDir = outDirBase + "/" + configBuild.buildType.production.outDir + configBuild.dirSuffix;
  if (isInternal) {
    // Default internal local (development) build output directory
    localInternalSiteOutDir = outDirBase + "/" + configBuild.buildType.localInternal.outDir + configBuild.dirSuffix;
    localSiteOutDir = localInternalSiteOutDir;
    // Default internal staging-site build output directory
    stagingInternalSiteOutDir = outDirBase + "/" + configBuild.buildType.stagingInternal.outDir + configBuild.dirSuffix;
    stagingSiteOutDir = stagingInternalSiteOutDir;
    // [IntInfo] We don't support internal publication builds.
  }

  // Offline-site build init (for `gen-offline-site` / `build` -o|--offline`)
  // [InfraInfo] offlineSiteDirName is used also from the theme JS files (see
  // task `set-global-js-vars`), and must be identical during the local build
  // and the offline-site generation tasks. Also, $cleanDir needs to be set to
  // $offlineDir in `gen-offline-site` so that the clean() dependency in the
  // call to the `create-offline-site` task (not standalone) works correctly.
  // But during init() for a `gen-offline-site` task, $isOffline is still false;
  // it's set to true in `create-offline-site` (which is executed from
  // `gen-offline-site`; could have also been set in the latter instead),
  // Therefore, the $offlineSiteDir[Name] variables are set even for non-offline
  // builds ($isOffline=false), and `create-offline-site` also calls
  // initOfflineLocalSiteDir() (like init()) to properly configure
  // $localSiteOutDir / $localInternalSiteOutDir for an offline build.
  process.env.IGZ_BUILD_OFFLINE = "false"; // Overridden in `build` for offline
  offlineSrcDir = ""; // See the [InfraInfo] in `create-offline-site`.
  offlineSiteDirName = configBuild.buildType.offline.outDir + configBuild.dirSuffix;
  offlineInternalSiteDirName = configBuild.buildType.offlineInternal.outDir + configBuild.dirSuffix;
  offlineSiteDir = outDirBase + '/' + offlineSiteDirName;
  if (argv['offlineDir']) {
    // Set the full path of the offline-site directory based on a CLI argument
    offlineSiteDir = argv['offlineDir'].replace(/\/$/, "");
    offlineSiteDirName = offlineSiteDir.replace(/^.*[\\\/]/, '');
  } else if (argv['offlineDirName']) {
    // Set the name of the offline-site directory based on a CLI argument
    offlineSiteDirName = argv['offlineDirName'];
    offlineSiteDir = outDirBase + '/' + offlineSiteDirName;
  } else if (process.env.IGZ_OFFLINE_SITE_DIR) {
    // Set the full path of the offline-site directory based on an envir var
    offlineSiteDir = process.env.IGZ_OFFLINE_SITE_DIR;
    offlineSiteDirName = offlineSiteDir.replace(/^.*[\\\/]/, '');
  } else if (process.env.IGZ_OFFLINE_SITE_DIR_NAME) {
    // Set the name of the offline-site directory based on an envir var
    offlineSiteDirName = process.env.IGZ_OFFLINE_SITE_DIR_NAME;
  } else if (isInternal) {
    offlineSiteDirName = offlineInternalSiteDirName;
    offlineSiteDir = outDirBase + '/' + offlineInternalSiteDirName;
  }
  // Specific offline-site configurations
  isOffline = false;
  if (argv['offline'] || argv['o']) {
    isOffline = true; // [InfraInfo] Also set to true from `create-offline-site`
    initOfflineLocalSiteDir();
  }

  // Set the task destination directory, such as the build-output directory
  if (argv['destination']) {
    siteDir = argv['destination'];
  } else if (argv['d']) {
    siteDir = argv['d'];
  }
  else {
    if (isInternal) {
      siteDir = localInternalSiteOutDir;
    }
    else {
      siteDir = localSiteOutDir;
    }

    if (argv['pub']) {
      siteDir = publicSiteOutDir;
    }
    else if (argv['staging']) {
      if (isInternal) {
        siteDir = stagingInternalSiteOutDir;
      }
      else {
        siteDir = stagingSiteOutDir;
      }
    }
  }

  // Archive-sources and cleanup directories initialization
  archiveSrcDir = siteDir;
  cleanDir = siteDir;
  if (isOffline) {
    archiveSrcDir = offlineSiteDir;
    cleanDir = offlineSiteDir;
  }
  // ****
}

// Get and process the gulp command-line arguments; return only Hugo arguments
function getCLIArgs() {
  return Object

  // Get all gulp command-line arguments (argv keys)
  .keys(argv)

  // Remove the argv `$0` and `_` keys, and custom non-Hugo or custom-handled
  // Hugo options (if set)
  .filter(function (key) {
    return ['$0',
            '_',
            'b',
            'baseURL',
            'bdir',
            'config',
            'configBuild',
            'configShared',
            'buildExec',
            'igzBuildInternal',
            'internal',
            'local',
            'noclean',
            'o',
            'offline',
            'offlineDir',
            'offlineDirName',
            'outbase',
            'pub',
            'src',
            'staging',
            'z',
            'zip']
      .indexOf(key) === -1;
  })

  // Format the arguments as command-line arguments (e.g., "-b", "-D",
  // "--buildDrafts", or "--contentDir <value>")
  .map(function(key) {
    // Handle both Boolean arguments (flags), which don't have separate values,
    // and non-Boolean arguments (e.g., "--verbose" vs. "--source path/to/dir")
    var value = argv[key];

    // Short argument names (one character) should have a single hyphen (-),
    // whereas longer argument names should have two hyphens (--)
    var hyphen = key.length > 1 ? '--' : '-';
    return hyphen + key + ((typeof argv[key] === 'boolean') ? '' : ' ' + value);
  })

  // Create a space-delimited string of all the formatted arguments
  .join(' ');
}

// Print tasks information (help text) for the given tasks-info dictionary
function printTasksInfo(taskKeys, tasksInfo, isFullInfo) {
  taskKeys.forEach(function (taskName) {
    console.log(taskName + ':  ' + tasksInfo[taskName][0] + '\n');
    if (isFullInfo) {
      console.log(tasksInfo[taskName][1] + '\n');
      console.log(tasksInfo[taskName][2] +'\n');
    }
  })
}
//////////////////////////////

//////////////////////////////
// Gulp Tasks

// SASS task - generate CSS code from SCSS and third-party CSS files
// TODO: Support theme-directory configuration also via the Hugo -t|--theme
// and --themeDir options (available, for example, in Hugo v0.73).
gulp.task('gen-css', function() {
  var sassStream = gulp.src(configBuild.themeDir + '/assets/scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}));

  var jsLibsBase = configBuild.themeDir + '/static/css/vendor';
  var cssStream = gulp.src([jsLibsBase + '/fontawesome.min.css', jsLibsBase + '/chroma/syntax-manni.css'])
    .pipe(concat('css-files.css'));

  var mergedStream = merge(cssStream, sassStream)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(configBuild.themeDir + '/static/css'));
  return mergedStream;
});

// Generate a vendor.js theme JavaScript file from third-party JS library files
// NOTE: This task is executed from the `gen-js-scripts` task.
gulp.task('gen-js-vendor', function() {
  var jsLibsBase = configBuild.themeDir + '/assets/js/libs/';

  gulp.src([jsLibsBase + 'jquery-3.4.1.min.js',
    jsLibsBase + 'lunrjs.min.js',
    jsLibsBase + 'debounce.min.js',
    jsLibsBase + 'bootstrap.bundle.min.js',
    jsLibsBase + 'clipboard.min.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(configBuild.themeDir + '/static/js/'));
});

// Create an offline version of the site from a local site build.
// NOTE: This task is executed from the `gen-offline-site` task, which is called
// from `build` task when called with the -o|--offline option.
// `create-offline-site` isn't intended to be called directly.
gulp.task('create-offline-site', function () {
  isOffline = true;
  if (!offlineSrcDir) {
    initOfflineLocalSiteDir();
    offlineSrcDir = localSiteOutDir;
  }
  // [InfraInfo] (sharonl) The $offlineSrcDir variable was added to avoid the
  // need to set both -d|--destination and --src in an offline build (`build`
  // task with -o|--offline) to override the default local-build directory from
  // which the offline site is then generated. $offlineSrcDir is initialized
  // only in the `build` task when called with -o|--offline (isOffline=true)
  // and -d|--destination.

  console.log("[**IGUAZIO**] Generating offline-site directory '" + offlineSiteDir + "' from local-build directory '" + offlineSrcDir + "' ...");

  var mainStream = merge(gulp.src(offlineSrcDir + "/*")
      .pipe(replace('"../', '"file://')),
    gulp.src([offlineSrcDir + "/*/**",
      "!" + offlineSrcDir + "/fonts/**",
      "!" + offlineSrcDir + "/images/**",
      "!" + offlineSrcDir + "/theme-images/**"]))
    .pipe(replace(baseUrl, 'file://'))
    .pipe(replace('/" data-url-parent', '/index.html" data-url-parent'))
    .pipe(replace('" class="side-menu', 'index.html" class="side-menu'))
    .pipe(replace('app.js', 'apps.js'))
    .pipe(gulp.dest(offlineSiteDir));

  var fontsStream = gulp.src(offlineSrcDir + '/fonts/**')
    .pipe(gulp.dest(offlineSiteDir + "/fonts/"));

  var imagesStream = gulp.src(offlineSrcDir + '/images/**')
    .pipe(gulp.dest(offlineSiteDir + "/images/"));

  var themeImagesStream = gulp.src(offlineSrcDir + '/theme-images/**')
    .pipe(gulp.dest(offlineSiteDir + "/theme-images/"));

  var indexStream = gulp.src([offlineSrcDir + '/index.json', offlineSrcDir + '/js/app.js'])
    .pipe(replace(/^\[\{/, 'var index = \[\{'))
    .pipe(concat('apps.js'))
    .pipe(gulp.dest(offlineSiteDir + '/js/'));

  return merge(mainStream, fontsStream, imagesStream, themeImagesStream, indexStream)
});

// Generate an offline version of the site (for browsing without a server) from
// a local site build.
// NOTE:
// - The task cleans the current offline site directory unless --noclean is set.
// - This task requires a $localSiteOutDir directory. If the directory doesn't
//   exist, or you rebuild it, either
//   (a) Use the `build` task with the -o|-offline` task to both perform the
//       local build and generate an offline site from the build directory (by
//       using the `gen-offline-site` task).
//   OR
//   (b) Run the following command to perform a local build before running the
//       `gen-offline-site` task; (`--local` is the default build option):
//         `gulp build --local [-d|--destination/--outbase <path>]`
// - $offlineSiteDirName must be identical when building the source local site
//   directory and when generating the offline-site directory. The default
//   offline-site directory path, or only the directory name, can be overridden
//   with the --offlineDir or --offlineDirName CLI options, or via the
//   $IGZ_OFFLINE_SITE_DIR or $IGZ_OFFLINE_SITE_DIR_NAME environment variables.
//   (This applies also to the local site build command.)
//   The default source local-build directory from which to generate the
//   offline-site directory can be overridden using the --src CLI option -
//   `--src <path to local-site dir>`.
gulp.task('gen-offline-site', function(callback) {
  cleanDir = offlineSiteDir;
  return sequence('clean', 'create-offline-site', callback);
});

// Generate a build-dependent Hugo data-variables file
gulp.task('generate-hugo-data-vars-file', [], function() {
  var content = '# This file is auto generated from gulpfile.js.\n';
  content += '## Build-Specific Data Variables\n';
  content += '\n';
  content += '## Relative ghpages-doc-site home URL for the current build\n';
  content += '[docs_home_url]\n';
  content += '  full      = "' + relDocsHomeUrl + '"\n';
  content += '  text_home = "' + dataVarsShared.docs_home.text_home + '"\n';
  content += '  text      = "' + dataVarsShared.docs_home.text + '"\n';
  content += '  text_full = "' + dataVarsShared.docs_home.text_full + '"\n';
  content += '\n';
  fs.writeFileSync(autogenHugoVarsFile, content + '\n');
});

// Generate an app.js theme JavaScript file from the theme's js/app/ files, and
// a vendor.js theme JavaScript file from third-party JavaScript library files
gulp.task('gen-js-scripts', ["gen-js-vendor"], function() {
  gulp.src([configBuild.themeDir + '/assets/js/app/*'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(configBuild.themeDir + '/static/js/'));
});

// Define global JavaScript variables to match site configuration variables
// that need to be accessed from the site's JS code
// This task is executed from the `serve` and `build` tasks, and from the
// `default` task via `serve`.
gulp.task('set-global-js-vars', [], function() {
  var globalVars = '<!-- This file is auto generated from gulpfile.js. -->\n\n';
  globalVars += '<!-- Set global JavaScript variables -->\n';
  globalVars += '<script type="text/javascript">\n';
  // Base URL
  globalVars += 'var baseURL = "' + baseUrl + '";\n';
  globalVars += 'var sharedVersionsFileURL = "' + sharedVersionsFileURL + '";\n';
  globalVars += 'var backupVersionsFile = "' + backupVersionsFile + '";\n';
  // Offline-site directory (generated with the gen-offline-site task, which is
  // executed from the `build` task when called with the -o|--offline option)
  globalVars += 'var offlineSiteDirName = "' + offlineSiteDirName + '";\n';
  // Hugo build configurations
  globalVars += 'var buildDrafts = ' + (process.env.HUGO_BUILDDRAFTS ? process.env.HUGO_BUILDDRAFTS : 'false') + ';\n';
  globalVars += 'var buildExpired = ' + (process.env.HUGO_BUILDEXPIRED ? process.env.HUGO_BUILDEXPIRED : 'false') + ';\n';
  globalVars += 'var buildFuture = ' + (process.env.HUGO_BUILDFUTURE ? process.env.HUGO_BUILDFUTURE : 'false') + ';\n';

  globalVars += '</script>\n';

  fs.writeFileSync(jsVarsFile, globalVars + '\n');
});

// Clean the configured clean directory - typically the build-output directory
// (-d|--destination); default = siteDir) or the offline-site directory for an
// offline-site generation (--offlineDir[Name]; default $localSiteOutDir).
// NOTE: This task is executed from the `build` and `gen-offline-site` tasks,
// unless --noclean is set.
gulp.task('clean', function() {
  if (isClean) {
    console.log("[**IGUAZIO**] Cleaning directory " + cleanDir + " ...");

    return gulp.src(cleanDir + '/*')
      .pipe(clean({
        force: true
      }));
  }
  else {
    console.log("[**IGUAZIO**] Skipping directory cleanup");
  }
});

// Copy relevant assets to the configured output directory (-d|--destination);
// default = $siteDir.
// NOTE: The target directory can be configured with the -d|--destination
// option. Use build options to determine which files to copy.
// Currently, this task is used from the build task to copy .htaccess files
// to the root output directory in non-internal publication (--pub|--staging)
// builds and to password-protected publication (--pub) output directories
//
// (regUsersOnlyDirs).
// [ci-redirect] [InfraInfo] (sharonl) (4.5.20) When we moved to separate
// versioned doc sites, I moved the sources for the .htaccess file for the root
// ghpages-doc-site directory ($relDocsHomeURL), which contains the versioned doc
// sites, to the iguazio/doc-assets repo (a public repo that contains the
// $sharedVersionsFileURL shared versions file) - see htaccess/ in
// https://github.com/iguazio/doc-assets,
// [ci-redirect-from-ver-site] I kept the assets/htaccess/.htaccess* files in
// the ghpages-doc-site repo and edited them for versioned ghpages-doc-site redirects. However,
// in a small POC test I wasn't able to get redirects of this type to work (I'm
// not sure why). Therefore, for now, the doc-assets repo's .htacess files also
// handle the versioned-site redirects that I planned to handle from each
// versioned doc site, and the versioned ghpages-doc-site .htaccess files are currently
// unused. For now, I commented out the part of the `copy-assets` Gulp task
// that copies these .htaccess files to the built site output directory.
gulp.task('copy-assets', function() {
  var destDir;
  var srcHtaccessDir = "./assets/htaccess/";
  var srcHtaccess;

  /* [ci-redirect-from-ver-site]
  // Copy versioned-site .htaccess file for non-internal public & staging builds
  if (argv['pub'] || (argv['staging'] && !isInternal)) {
        if (argv['pub']) {
          srcHtaccess = srcHtaccessDir + configBuild.buildType.production.srcRootHtaccess;
        }
        else {
          srcHtaccess = srcHtaccessDir + configBuild.buildType.staging.srcRootHtaccess;
        };
        destDir = siteDir + (siteDir.endsWith('/') ? "" : '/');
        console.log("[**IGUAZIO**] Copying " + srcHtaccess + " to " + destDir + ".htaccess ...");
          gulp.src(srcHtaccess)
            .pipe(rename('.htaccess'))
            .pipe(gulp.dest(destDir));
  };
  */

  // Copy registered-users sections .htaccess files for public builds
  if (argv['pub']) {
    configBuild.regUsersOnlyDirs.forEach(function(value) {
        if (value != "/") {
          srcHtaccess = srcHtaccessDir + configBuild.buildType.production.srcRegUsersHtaccess;
          destDir = siteDir + (value.startsWith('/') ? "" : '/') + value + (value.endsWith('/') ? "" : '/');
          console.log("[**IGUAZIO**] Copying " + srcHtaccess + " to " + destDir + ".htaccess" + " ...");
          gulp.src(srcHtaccess)
            .pipe(rename('.htaccess'))
            .pipe(gulp.dest(destDir));
        };
    });
  }
});

// Watch asset directories for changes
gulp.task('watch', ['gen-css'], function() {
  gulp.watch(configBuild.themeDir + '/assets/scss/**', ['gen-css']);
  gulp.watch(configBuild.themeDir + '/assets/js/**', ['gen-js-scripts']);
});

// Create a ZIP archive of the site directory
// NOTE:
// - This task is run from the `build` task when using the -z|--zip option.
// - The target archive file is created in the parent directory of the source
//   site directory - $archiveSrcDir = $siteDir or $offlineSiteDir when setting
//   -o|--offline - and its name is <site-dir name>.zip.
gulp.task('zip', function() {
  // Extract the target archives path from the source path
  var site_dir_name = archiveSrcDir.split(/(\\|\/)/g).pop();
  var zip_name = site_dir_name + ".zip";
  var dest_dir = archiveSrcDir.match(/(.*)[\/\\]/)[1] || '';

  // Create a ZIP archive of the site directory
  console.log("[**IGUAZIO**] Archiving " + archiveSrcDir + " as " + dest_dir + "/" + zip_name + " ...");
  gulp.src(archiveSrcDir + "/**")
    .pipe(rename(function (path) {
      path.dirname = site_dir_name + "/" + path.dirname;
    }))
    .pipe(zip(zip_name))
    .pipe(gulp.dest(dest_dir))
  /* [InfraInfo] (sharonl) (23.5.20) The `rename` pipe is used to include the
   * base (parent) output site directory in the archive file. (Reference:
   * https://github.com/sindresorhus/gulp-zip/issues/41#issuecomment-631494008)
   * I tried, instead, to add `, {base: ...}` to the gulp.src call, but
   * `{base: process.cwd()}` added two directories - outDirBase > site_dir_name
   * - and `{base: site_dir_name}` produced an invalid directory-path error.
   */
});

// Build a site directory using Hugo, and execute related tasks
gulp.task('build', ['gen-js-scripts', 'generate-hugo-data-vars-file', 'set-global-js-vars', 'gen-css', 'info'], function(callback) {
  var tasks = ['copy-assets'];

  // When -o|--offline is set, run a local build (with a dedicated dir name)
  // and generate an offline site from this local build
  if (isOffline) {
    process.env.IGZ_BUILD_OFFLINE = "true";
    if (argv['destination'] || argv['d']) {
      offlineSrcDir = siteDir; // See the [InfraInfo] in `create-offline-site`.
    }
    tasks.push('gen-offline-site');
  }

  // When -z|--zip is set, also create a ZIP archive of the built site
  if ((argv['zip'] || argv['z'])) {
    tasks.push('zip')
  }

  console.log("[**IGUAZIO**] Building site with baseUrl='" + baseUrl +
    "', output directory='" + siteDir + "' ...");

  // Execute build and additional tasks
  sequence('clean', function() {
    exec(buildExec + ' --destination ' + siteDir + ' --config "' + configHugoFiles + '" ' + getCLIArgs(),
      function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        sequence(...tasks, callback);
      }
    );
  });
  // [InfraInfo] The output for a console.log() call added here, appears in the
  // output after the output of the clean task's console.log call and before
  // the "Finished 'clean`" message.
});

// Serve a site locally with Hugo, and execute related tasks
gulp.task('serve', ['gen-js-scripts', 'generate-hugo-data-vars-file', 'set-global-js-vars', 'info'], shell.task([buildExec + ' serve -p' + port + ' --config "' + configHugoFiles + '" ' + getCLIArgs()]));
// [InfraInfo] (sharonl) Using a similar body implementation as for the `build`
// task for `serve` doesn't show the Hugo CLI output, probably because the exec
// command waits for the Hugo command to complete.
//
// (18.7.20) The following `serve` with-body implementation works, but it has
// the issue of not showing Hugo serve messages. UPDATE (20.9.20) At the time
// of the test, we used a processCustomCLIArgs() function, which was included
// in the task's dependencies (the processing is now done in init()). The test
// implementation worked also when --buildExec was processed in
// processCustomCLIArgs().
// The disadvantage of the current syntax is that the getCLIArgs() function is
// called each time Gulp is run, even if the `serve` task isn't run (the hugo
// serve command isn't executed on each Gulp run). (20.10.20) I verified that
// getCLIArgs() is called implicitly because of the use in the `serve` task.
// For example, it's called also for the `info` task, event though the code
// doesn't call the function directly for this task (including not in init()).
/*
gulp.task('serve', ['gen-js-scripts', 'generate-hugo-data-vars-file', 'set-global-js-vars', 'info'], function(callback) {
  exec(buildExec + ' serve -p' + port + ' --config "' + configHugoFiles + '" ' + getCLIArgs(),
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback();
    }
  );
});
*/

// Display basic build and environment information
gulp.task('info', function(callback) {
  exec(buildExec + ' version',
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback();
    }
  );
});
// [InfraInfo] (sharonl) The following variations always execute the default
// Hugo binary (`hugo` = default $buildExec value), ignoring the --buildExec
// CLI option or $IGZ_BUILD_EXEC environment variable, if set:
//
//gulp.task('info', shell.task([buildExec + ' version']));

// List the supported Gulp tasks
// [ci-init-output-eliminate-for-some-tasks] TODO: Eliminate the init() console
// output or overall call for the `list-tasks` task.
gulp.task('list-tasks', function() {
  var tasksList = Object.keys(tasksInfoAll).sort();

  tasksList.forEach(function (taskName) {
    console.log(taskName);
  });
});

// Display help text - Gulp-tasks usage information
// USAGE:
// 1. `gulp help` - display help text (usage information) including short task
//    descriptions..
// 2. `gulp help -<task name> [--<task name>[, --<task-name> ...]]` - display
//    full help text (usage information( for the specified task.
// TODO:
// - Change the implementation to pass a task-name as arguments, not an option
//   (flag) - e.g., `help build` and not `help --build`. There's no need to
//  support multiple task-name arguments (as currently done via --<task name>).
// - [ci-init-output-eliminate-for-some-tasks] TODO: Eliminate the init()
//   console output or overall call for the `help` task.
gulp.task('help', function() {
  var tasks= [];
  var tasksInfo= [];
  var tasksMain = [];
  var tasksSecondary = [];
  var tasksAux = [];
  var tasksHelp = [];

  Object.keys(argv).forEach(function (arg) {
    if (arg in tasksInfoMain) {
      tasksMain.push(arg);
    } else if (arg in tasksInfoSecondary) {
      tasksSecondary.push(arg);
    } else if (arg in tasksInfoAux) {
      tasksAux.push(arg);
    } else if (arg in tasksInfoHelp) {
      tasksHelp.push(arg);
    }
  });
  var tasks = tasksMain + tasksSecondary + tasksAux + tasksHelp;

  if (tasks.length === 0) { // All-tasks help (short task descriptions)
    printTasksInfo(['help'], tasksInfoHelp, true);
    console.log('** Gulp Help **\n');
    console.log('USAGE: gulp [<task>] [OPTIONS]\n');
    console.log(`OPTIONS: The options are task-specific. For detailed usage information, run
         'gulp help --<task name>' or 'gulp help' for the 'help' task.
          For general 'gulp' help, run 'gulp --help'.`);
    console.log();
    console.log('<task> - the following Gulp tasks are supported:\n');

    // Main tasks
    console.log('Main Tasks');
    console.log('----------');
    printTasksInfo(Object.keys(tasksInfoMain), tasksInfoMain, false);
    // Secondary tasks
    console.log('Secondary Tasks (executed from relevant main tasks)');
    console.log('---------------');
    printTasksInfo(Object.keys(tasksInfoSecondary), tasksInfoSecondary, false);
    // Auxiliary tasks
    console.log('Low-Level Auxiliary Tasks (typically executed from other tasks only)');
    console.log('-------------------------');
    printTasksInfo(Object.keys(tasksInfoAux), tasksInfoAux, false);
    // Help tasks
    console.log('Help Tasks');
    console.log('----------');
    printTasksInfo(Object.keys(tasksInfoHelp), tasksInfoHelp, false);
  } else { // Specific-tasks help (full task usage information)
    // Main tasks
    printTasksInfo(tasksMain, tasksInfoMain, true);
    // Secondary tasks
    printTasksInfo(tasksSecondary, tasksInfoSecondary, true);
    // Auxiliary tasks
    printTasksInfo(tasksAux, tasksInfoAux, true);
    // Help tasks
    printTasksInfo(tasksHelp, tasksInfoHelp, true);
  }

  console.log(`NOTES
-----
You can also run some Hugo commands directly. For example,
- 'hugo config' - Print the site configuration (Hugo configurations only).
- 'hugo help [command]' OR 'hugo [command] --help' - display Hugo help.
- 'hugo list <all|drafts|expired|future>' - list content of the specified types.
- 'hugo version'  - Print the Hugo version number.`);
});

// Set the default gulp task - `serve` + `watch`
gulp.task('default', ['serve', 'watch']);
//////////////////////////////

