
var message = require('./message');

module.exports = (function() {

  // function to be called for node processing
  var _callback = null;

  // react to the addition of a single new node
  var _on_new_node = function(node) {
    try {
      // get a message object to send around
      var payload = message.from_node(node);

      // send the message back
      _callback(payload);
    }
    catch (err) {
      // we don't really care about those
      //console.log(err);
    }
  };

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

  // apply our local css styling
  var _apply_worse_css = function(toggle) {
    var chatbox = document.querySelector('.ember-chat');

    if (!chatbox) {
      console.log("[chat] no chat container found on " + document.title + " " + document.URL);
      return;
    }

    chatbox.classList.toggle("worsettv", toggle);
  };

  // observe addition to the chat's DOM, run a callback for each new message
  var start_observing = function(callback) {
    var domQuery = document.querySelector('.chat-lines');

    // abort if there's no chat to observe
    if (domQuery == null) {
      console.log("[chat] no chat lines found on " + document.title + " " + document.URL);
      return;
    }

    // register the callback
    _callback = callback;

    // start observing the DOM
    _observer.observe(domQuery, { childList: true });
    //console.log("[chat] starting to observe " + document.title + " " + document.URL);

    // apply our custom css while the observer runs
    _apply_worse_css(true);
  };

  // stop observing and remove our styling
  var stop_observing = function() {
    _observer.disconnect();
    _apply_worse_css(false);
  };

  // public API
  return {
    observer: {
      start: start_observing,
      stop: stop_observing,
    },
  };

})();
