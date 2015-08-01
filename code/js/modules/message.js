
module.exports = (function() {

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
      if (badge.classList.contains(level)) {
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

  // react to the addition of a single new node
  var from_node = function(node) {

    var message = {};

    message.text = _get_plain_text_message(node);

    // early exit of bogus nodes
    if (message.text === "") { return; }

    message.id = node.id;
    message.user_level = _get_user_level(node);
    message.username = _get_username(node);

    return message;
  };

  // public API
  return {
    from_node: from_node
  };

})();
