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

// Twitch message parser
module.exports = (function() {

  // returns the node's id attribute
  // throws
  var parse_id = function(node) {
    if (typeof node.id === 'undefined') {
      throw new Error('Bogus node');
    }
    else if (node.id === "") {
      throw new Error('Bogus node');
    }
    return node.id;
  };

  // list of Twitch badges
  var _badges = ['staff', 'global-moderator', 'admin', 'broadcaster', 'moderator', 'subscriber'];

  // returns the credential badge of the author, default to pleb
  // throws
  var parse_badge = function(node) {
    var element = node.querySelector('div.badge');

    if (!element) { return 'pleb'; }

    // search for a credentials badge class
    for (var i = 0; i < _badges.length; i += 1) {
      if (element.className.indexOf(_badges[i]) > -1) {
        return _badges[i];
      }
    }

    return 'pleb';
  };

  // returns the text content of a chat line, emotes are replaced by their title
  // throws
  var parse_plain_text_message = function(node) {
    var element = node.querySelector('span.message');
    var text = element.innerHTML;

    // replace each img tag with its alt text
    Array.prototype.slice.call(element.querySelectorAll('img')).forEach(function(image) {
      text = text.replace(image.outerHTML, image.alt);
    });

    return text.trim();
  };

  // returns the message's author's username
  // throws
  var parse_username = function(node) {
    var element = node.querySelector('span.from');

    return element.textContent;
  };

  // public API
  return {
    get_id: parse_id,
    get_badge: parse_badge,
    get_message: parse_plain_text_message,
    get_username: parse_username
  };

})();
