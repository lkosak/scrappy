var redis = require('redis');

var DB = (function() {

  var client;

  function DB(options) {
    options = _.defaults({
      port: 6379,
      host: '127.0.0.1'
    }, options.merge);

    client = redis.createClient(options.port, options.host);
  };

  return DB;
})();

module.exports = DB;
