var redis = require('redis');
var _ = require('lodash');

var DB = (function() {

  var client;

  function DB(options) {
    options = options || {};

    _.defaults(options, {
      port: 6379,
      host: '127.0.0.1'
    });

    client = redis.createClient(options.port, options.host);
  }

  return DB;
})();

module.exports = DB;
