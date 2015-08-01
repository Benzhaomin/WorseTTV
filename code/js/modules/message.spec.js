var assert = require("assert");
var jsdom = require('mocha-jsdom');
var message = require('./message');

describe('message modules', function() {

  // message.from_node()
  describe('from_node()', function() {

    jsdom();

    it('builds a message object with proper  content', function() {
      document.body.innerHTML = '<div id="ember1209" class="ember-view">  <li id="ember1210" class="ember-view message-line chat-line"><div class="indicator"></div><span class="timestamp float-left">11:10</span> <span class="badges float-left"><div class="badge float-left tooltip subscriber" title="Subscriber"></div></span><span class="from" style="color:#1E90FF">Username</span><span class="colon">:</span> <span class="message" style="undefined">Skinnydipping <img class="emoticon tooltip" src="http://static-cdn.jtvnw.net/emoticons/v1/25/1.0" alt="Kappa" title="Kappa"></span></li></div>';

      var node = document.getElementById('ember1209');
      var m = message.from_node(node);

      assert.equal('ember1209', m.id);
      assert.equal('Username', m.username);
      assert.equal('sub', m.user_level);
      assert.equal('Skinnydipping Kappa', m.text);
    });

  });
});
