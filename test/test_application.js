var describe = global.describe,
  it = global.it,
  beforeEach = global.beforeEach;

var fs = require("fs");
var assert = require("assert");
var app = require("../lib/application");
var vumigo = require("vumigo_v01");

describe('SMS Llama', function () {

  var tester;
  var fixtures = [
    'test/fixtures/foo_url.json'
  ];

  describe('when receiving an SMS', function() {

    beforeEach(function () {
      tester = new vumigo.test_utils.ImTester(app.api, {
        custom_setup: function (api) {
          api.config_store.config = JSON.stringify({
              url: 'http://foo/'
          });

          fixtures.forEach(function (f) {
            api.load_http_fixture(f);
          });
        },
        async: true
      });
    });

    it('should post to the configured URL.', function (done) {
      tester.check_state({
        user: null,
        content: 'foo',
        next_state: 'keyword',
        response: 'http://foo/ said foo!',
        continue_session: false
      }).then(done, done);
    });
  });
});