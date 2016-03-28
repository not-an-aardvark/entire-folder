'use strict';
const path = require('path');
const parentModuleDirectory = module.parent.filename ? path.dirname(module.parent.filename) : process.cwd();
const getBaseName = filename => path.basename(filename, path.extname(filename));
module.exports = function (folderPath) {
  const folderExports = {};
  const absFolderPath = path.isAbsolute(folderPath) ? folderPath : path.join(parentModuleDirectory, folderPath);
  const rawFilenames = require('fs')
    .readdirSync(absFolderPath)
    .filter(name => require.extensions.hasOwnProperty(path.extname(name)));
  const allBaseNames = rawFilenames.map(getBaseName);
  const necessaryBaseNames = allBaseNames.map((baseName, index, arr) => {
    return arr.indexOf(baseName) === arr.lastIndexOf(baseName) ? baseName : rawFilenames[index];
  });
  necessaryBaseNames.forEach(filename => {
    folderExports[filename] = module.parent.require(path.join(absFolderPath, filename));
  });
  return folderExports;
};
