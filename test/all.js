var test = require('tape');
var response = require('../');

function t(str, fn) {
  test(str, function(assert) {
    fn(assert);
    assert.end();
  })
}

