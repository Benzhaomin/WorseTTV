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

var parser = require('./parser');

module.exports = (function() {

  var Message = function() {};

  // holds a Twitch chat message, built from a DOM node
  Message.prototype.from_node = function(node) {

    // keep a reference to the DOM Element
    this._node = node;

    // parse the node's data for outsiders
    this.id = parser.get_id(this._node);
    this.author = parser.get_username(this._node);
    this.badge = parser.get_badge(this._node);
    this.text = parser.get_message(this._node);

    if (this.text === "") {
      throw new Error("Found a node with no content: " + this.id);
    }

    return this;
  };

  // builds a message from its DOM id
  Message.prototype.from_id = function(id) {
    var node = document.getElementById(id);

    return this.from_node(node);
  };

  // changes a message's status (ill or sane)
  Message.prototype.status = function(s) {
    if (s === "ill" || s === "sane") {
      // remove the previous status class if any
      this._node.className = this._node.className.replace("ill", "").replace("sane", "");

      // add the new class
      this._node.className += " " + s;
    }
  };

  // build from DOM helper
  var from_node = function(node) {
    return new Message().from_node(node);
  };

  // build from id helper
  var from_id = function(id) {
    return new Message().from_id(id);
  };

  // public API
  return {
    from_node: from_node,
    from_id: from_id
  };

})();
