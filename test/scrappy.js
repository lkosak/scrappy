var mocha  = require('mocha');
var expect = require('chai').expect;

describe("Scrappy", function () {
  it("should know its version", function () {
    var myProject = require('../index');
    expect(myProject.version).to.not.equal(undefined);
  });
});
