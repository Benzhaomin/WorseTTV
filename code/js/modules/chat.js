
var message = require('./message');

module.exports = (function() {

  // observe the DOM and report addition of nodes
  var _observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      Array.prototype.slice.call(mutation.addedNodes).forEach(function(node) {
        if (node instanceof Element) {
          _on_new_node(node);
        }
      });
    });
  });

  // react to the addition of a single new node
  var _on_new_node = function(node) {

    // get a message object to send around
    var payload = message.from_node(node);

    // send the message back
    if (payload) {
      _callback(payload.id, payload.text);
    }
  };

  // function to be called for node processing
  var _callback = null;

  // apply our local css styling
  var _apply_worse_css = function(toggle) {
    var chatbox = document.querySelector('.ember-chat');

    if (!chatbox) { return; }

    chatbox.classList.toggle("worsettv", toggle);
  };

  // observe addition to the chat's DOM, run a callback for each new message
  var start_observing = function(callback) {

    // abort if there's no chat to observe
    if (document.querySelector('.chat-lines') == null) {
      console.log("[chat] nothing to be observed on " + document.title + " " + document.URL);
      return;
    }

    // register the callback
    _callback = callback;

    // start observing the DOM
    _observer.observe(document.querySelector('.chat-lines'), { childList: true });
    console.log("[chat] starting to observe " + document.title + " " + document.URL);

    // apply our custom css while the observer runs
    _apply_worse_css(true);
  };

  // stop observing and remove our styling
  var stop_observing = function() {
    _observer.disconnect();
    _apply_worse_css(false);
  };

  // changes a DOM message to the ill status
  var ill_message = function(node_id, text) {
    var node = document.getElementById(node_id);

    // abort on bogus nodess
    if (!node) { return; }

    node.classList.add("ill");
  };

  // changes a DOM message to the sane status
  var sane_message = function(node_id, text) {
    var node = document.getElementById(node_id);

    // abort on bogus nodes
    if (!node) { return; }

    node.classList.add("sane");
  };

  // public API
  return {
    observer: {
      start: start_observing,
      stop: stop_observing,
    },
    message: {
      ill: ill_message,
      sane: sane_message,
    },
  };

})();
