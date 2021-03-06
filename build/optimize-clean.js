var utils = require('./utils');
var config = require('./config').config;

function debug(str) {
  //dump(' -*- l10n-clean.js: ' + str + '\n');
}

function execute() {
  debug('Begin');

  utils.Gaia.webapps.forEach(function(webapp) {
    // if BUILD_APP_NAME isn't `*`, we only accept one webapp
    if (config.BUILD_APP_NAME != '*' &&
      webapp.sourceDirectoryName != config.BUILD_APP_NAME) {
      return;
    }

    debug(webapp.sourceDirectoryName);

    let re = new RegExp('\\.html\\.' + config.GAIA_DEFAULT_LOCALE + '$');
    let files = utils.ls(webapp.buildDirectoryFile, true);
    files.forEach(function(file) {
      if (
        re.test(file.leafName) ||
        file.leafName.indexOf(utils.Gaia.aggregatePrefix) === 0
      ) {
        file.remove(false);
      }
    });
  });

  debug('End');
}

exports.execute = execute;
