
var emotes = require('./emotes');

module.exports = (function() {

  // message must have a minimum of {count} words
  var MinimumWordCount = function(count) {
    return {
      exhibited_by: function(text) {
        return text.split(' ').length < count;
      },
    };
  };

  // message can have a maximum of a {ratio} upper to lower characters
  var MaximumCapsRatio = function(ratio) {
    return {
      exhibited_by: function(text) {
        text = emotes.strip(text, true);
        return text.replace(/[a-z]/g, '').length / text.length > ratio;
      },
    };
  };

  // message can have a maximum of {count} emotes
  var MaximumEmoteCount = function(count) {
    return {
      exhibited_by: function(text) {
        return emotes.count(text) > count;
      },
    };
  };

  // message can have a maximum of {ratio} emotes to words
  var MaximumEmoteRatio = function(ratio) {
    return {
      exhibited_by: function(text) {
        return emotes.count(text) / text.split(' ').length > ratio;
      },
    };
  };

  // message can have a maximum of {ratio} echoing words
  var MaximumEchoRatio = function(ratio) {
    return {
      exhibited_by: function(text) {

        var words = text.split(' ');

        // count occurrences of each word
        var counts = {};

        words.forEach(function(word) {
          counts[word] = (counts[word] || 0)+1;
        });

        // count unique words
        var unique = 0;

        for (var word in counts) {
          if (counts[word] < 2) {
            unique++;
          }
        }

        return 1 - (unique / words.length) > ratio;
      },
    };
  };

  // detects long messages being copy-pasted
  var CopyPasta = function() {
    var _minLength = 60;
    var _pastas = [];

    return {
      exhibited_by: function(text) {

        // early-exit most of the time
        if (text.length < _minLength) {
          return false;
        }

        // try to find that text in our pasta buffer
        var is_copy = _pastas.some(function(pasta) {
          return pasta === text;
        });

        // add new text to the buffer
        if (!is_copy) {
          _pastas.push(text);
        }

        // purge our buffer as it fills up
        if (_pastas.length > 100) {
          _pastas.shift();
        }

        return is_copy;
      },
    };
  };

  // public API
  return {
    MinimumWordCount: MinimumWordCount,
    MaximumCapsRatio: MaximumCapsRatio,
    MaximumEmoteCount: MaximumEmoteCount,
    MaximumEmoteRatio: MaximumEmoteRatio,
    MaximumEchoRatio: MaximumEchoRatio,
    CopyPasta: CopyPasta,
  };

})();
