
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
