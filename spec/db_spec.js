require('./spec_helper');

describe('DB', function() {
  it('sets default port and IP', function () {
    var redis = jasmine.createSpyObj("redis", ['createClient']);
    var DB = loadModule('./lib/db.js', { redis: redis });
    var db = new DB();
    expect(redis.createClient).toHaveBeenCalledWith(6379, '127.0.0.1');
  });
});
