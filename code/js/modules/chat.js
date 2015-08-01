
var chat = (function () {

  // match Twitch badges to a credential level
  var _badge_to_level = {
    'staff':            'master',
    'global-moderator': 'master',
    'admin':            'master',
    'broadcaster':      'master',
    'moderator':        'master',
    'subscriber':       'sub',
    'pleb':             'pleb'
  };

  // returns the author's credentials level (master, sub, pleb)
  var _get_user_level = function(node) {
    var badge = node.querySelector('div.badge');

    if (!badge) { return _badge_to_level.pleb; }

    // try to match one of the level with a badge class
    for (var level in _badge_to_level) {
      if (badge.classList.indexOf(level) > -1) {
        // return our own kind of level
        return _badge_to_level[level];
      }
    }

    return _badge_to_level.pleb;
  };

  // returns the content of a chat line, emotes are replaced by their title
  var _get_plain_text_message = function(node) {
    var message = node.querySelector('span.message');

    // abort on bogus nodes
    if (!message) { return ""; }

    var text = message.innerHTML;

    // replace each img tag by its alt text
    Array.prototype.slice.call(message.querySelectorAll('img')).forEach(function(image) {
      text = text.replace(image.outerHTML, image.alt);
    });

    return text;
  };

  // returns the message's author's username
  var _get_username = function(node) {
    var username = node.querySelector('span.from');

    // abort on bogus nodes
    if (!username) { return ""; }

    return username.textContent;
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

  // react to the addition of a single new node
  var _on_new_node = function(node) {

    // prepare a message object to send around
    var message = {};

    message.text = _get_plain_text_message(node);

    // early exit of bogus nodes
    if (message.text === "") { return; }

    message.user_level = _get_user_level(node);
    message.username = _get_username(node);

    // send the message back
    _callback(node.id, message.text);
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

if (typeof module !== "undefined") {
  module.exports = chat;
}
else {
  window.chat = chat;
}
