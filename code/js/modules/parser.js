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

    return text;
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
