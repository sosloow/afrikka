var fs = require('fs');
var parseString = require('xml2js').parseString;
var _ = require('lodash');

function transformSvg(xml) {
  var paths = _.map(xml.svg.g[0].path, '$');

  console.dir(paths);
  return JSON.stringify(paths);
};

module.exports = function(svgPath, jsonPath, next) {
  fs.readFile(svgPath, function(err, data) {
    parseString(data, function(err, result) {
      fs.writeFile(jsonPath, transformSvg(result), next);
    });
  });
};
