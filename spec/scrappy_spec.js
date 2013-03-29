var jasmine = require('jasmine-node');

describe("Scrappy", function () {
  it("should know its version", function () {
    var myProject = require('../index');
    expect(myProject.version).not.toBeUndefined();
  });
});
