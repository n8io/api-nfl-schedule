var path = require('path');

module.exports = function(app, dir) {
  require('fs').readdirSync(__dirname).forEach(function(file) {
    if(file.toLowerCase() === 'index.js') {
      return;
    }

    var filePath  = path.join(__dirname, file.split('.js').join(''));

    require(filePath)(app, path);
  });
};
