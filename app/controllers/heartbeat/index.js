var rootController = function() {};

rootController.get = get;

module.exports = rootController;

function get(req, res) {
  return res
    .status(200)
    .json({
      message: 'OK'
    })
    ;
}
