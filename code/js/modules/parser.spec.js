/**
  Twitch No Cancerino, a browser extension to filter cancer out of Twitch's chat.
  Copyright (C) 2015-2017 Benjamin Maisonnas

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/gpl-3.0.en.html>.
*/

var assert = require("assert");
var jsdom = require('jsdom-global');
var parser = require('./parser');

var get_test_node = function(args) {

  var template = '<div id="{ID}" class="ember-view test-node">  '+
    '<li id="ember1210" class="ember-view message-line chat-line">  '+
    '<div class="indicator"></div>  '+
    '<span class="timestamp float-left">11:10</span>   '+
    '<span class="badges float-left"><div class="badge float-left tooltip {BADGE}" title="Subscriber"></div></span>  '+
    '<span class="from" style="color:#1E90FF">{USERNAME}</span><span class="colon">:</span>   '+
    '<span class="message" style="undefined">{MESSAGE}</span>'+
    '</li></div>';

  for (var arg in args) {
    template = template.replace(arg, args[arg]);
  }

  document.body.innerHTML = template;

  return document.querySelector('.test-node');
};

describe('parser module', function() {

  // parser.get_id()
  describe('get_id()', function() {

    jsdom();

    it('parses the id correctly', function() {
      var id = 'ember1209';
      var node = get_test_node({'{ID}': id});

      assert.equal(id, parser.get_id(node));
    });

    it('throws an exception on bogus nodes', function() {
      var node = get_test_node().querySelector('span.from');

      assert.throws(function() { parser.get_id(null); });
      assert.throws(function() { parser.get_id('nothing'); });
      assert.throws(function() { parser.get_id(node); });
    });

  });

  // parser.get_badge()
  describe('get_badge()', function() {

    jsdom();

    it('parses all badges correctly', function() {
      var node;

      ['staff', 'global-moderator', 'admin', 'broadcaster', 'moderator', 'subscriber'].forEach(function(badge) {
        node = get_test_node({'{BADGE}': badge});

        assert.equal(badge, parser.get_badge(node));
      });
    });

    it('throws an exception on bogus nodes', function() {
      assert.throws(function() { parser.get_badge(null); });
      assert.throws(function() { parser.get_badge('nothing'); });
    });

    it('defaults to pleb', function() {
      var node = get_test_node().querySelector('span.message');

      assert.equal('pleb', parser.get_badge(node));
    });

  });

  // parser.get_username()
  describe('get_username()', function() {

    jsdom();

    it('parses the username correctly', function() {
      var author = 'forsen';
      var node = get_test_node({'{USERNAME}': author});

      assert.equal(author, parser.get_username(node));
    });

    it('throws an exception on bogus nodes', function() {
      var node = get_test_node().querySelector('span.message');

      assert.throws(function() { parser.get_username(null); });
      assert.throws(function() { parser.get_username('nothing'); });
      assert.throws(function() { parser.get_username(node); });
    });

  });

  // parser.get_text()
  describe('get_text()', function() {

    jsdom();

    it('parses simple text correctly', function() {
      var message = 'forsen forsen';
      var node = get_test_node({'{MESSAGE}': message});

      assert.equal(message, parser.get_message(node));
    });

    it('strips spaces', function() {
      var message = '                 forsen forsen       ';
      var node = get_test_node({'{MESSAGE}': message});

      assert.equal(message.trim(), parser.get_message(node));
    });

    it('parses text and replaces emotes', function() {
      var message = 'forsen <img class="emoticon tooltip" src="http://static-cdn.jtvnw.net/emoticons/v1/25/1.0" alt="Kappa" title="Kappa">';
      var node = get_test_node({'{MESSAGE}': message});

      assert.equal('forsen Kappa', parser.get_message(node));
    });

    it('throws an exception on bogus nodes', function() {
      var node = get_test_node().querySelector('span.from');

      assert.throws(function() { parser.get_message(null); });
      assert.throws(function() { parser.get_message('nothing'); });
      assert.throws(function() { parser.get_message(node); });
    });

  });

});
