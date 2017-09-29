/**
  Twitch No Cancerino, a browser extension to filter cancer out of Twitch's chat.
  Copyright (C) 2015 Benjamin Maisonnas

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
var message = require('./message');

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

describe('message module', function() {

  // message.from_node()
  describe('message.from_node()', function() {

    jsdom();

    it('builds a message object with proper content from a node', function() {
      var node = get_test_node({
        '{ID}': 'ember1209',
        '{BADGE}': 'subscriber',
        '{USERNAME}': 'Username',
        '{MESSAGE}': 'Skinnydipping Kappa'
      });
      var msg = message.from_node(node);

      assert.equal('ember1209', msg.id);
      assert.equal('subscriber', msg.badge);
      assert.equal('Username', msg.author);
      assert.equal('Skinnydipping Kappa', msg.text);
    });

  });

  // message.from_id()
  describe('message.from_id()', function() {

    jsdom();

    it('builds a message object with proper content from its id', function() {
      get_test_node({
        '{ID}': 'ember1209',
        '{BADGE}': 'subscriber',
        '{USERNAME}': 'Username',
        '{MESSAGE}': 'Skinnydipping Kappa'
      });
      var msg = message.from_id('ember1209');

      assert.equal('ember1209', msg.id);
      assert.equal('subscriber', msg.badge);
      assert.equal('Username', msg.author);
      assert.equal('Skinnydipping Kappa', msg.text);
    });

  });

  // message.Message.status()
  describe('message.Message.status()', function() {

    jsdom();

    it('ignores invalid statuses', function() {
      var node = get_test_node();
      var msg = message.from_node(node);

      msg.status('invalid');
      assert.equal(true, node.className.indexOf('invalid') === -1);
      assert.equal(true, node.className.indexOf('sane') === -1);
      assert.equal(true, node.className.indexOf('ill') === -1);
    });

    it('adds ill and sane classes', function() {
      var node = get_test_node();
      var msg = message.from_node(node);

      msg.status('ill');
      assert.equal(true, node.className.indexOf('ill') > -1);

      msg.status('sane');
      assert.equal(true, node.className.indexOf('sane') > -1);
    });

    it('replaces ill and sane classes on updates', function() {
      var node = get_test_node();
      var msg = message.from_node(node);

      msg.status('ill');
      assert.equal(true, node.className.indexOf('ill') > -1);
      assert.equal(true, node.className.indexOf('sane') === -1);

      msg.status('sane');
      assert.equal(true, node.className.indexOf('ill') === -1);
      assert.equal(true, node.className.indexOf('sane') > -1);

      msg.status('ill');
      assert.equal(true, node.className.indexOf('ill') > -1);
      assert.equal(true, node.className.indexOf('sane') === -1);
    });
  });
});
