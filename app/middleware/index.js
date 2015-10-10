var path = require('path');

module.exports = function(app, dir) {
  require('fs').readdirSync(__dirname).forEach(function(file) {
    if(file.toLowerCase() === 'index.js') {
      return;
    }

    require(path.join(__dirname, file))(app, path);
  });
};
