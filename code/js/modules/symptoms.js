
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
    var _minLength = 100; // ignore text shorter than this limit
    var _maxSimilarityRatio = 0.9; // pastas are text more than 90% alike
    var _pastas = [];

    // returns whether the text looks like the pasta
    var _smells_like_pasta = function(text, pasta) {
      // we could sort and unduplicate words both in the saved pasta and the text itself
      var words = text.split(' ');

      // find duplicate words
      var common = words.filter(function(word) {
        return pasta.indexOf(word) > -1;
      });

      // if a lot of words are common to the text and the pasta, smells like pasta
      return common.length / pasta.split(' ').length > _maxSimilarityRatio;
    };

    return {
      exhibited_by: function(text) {

        // early-exit most of the time
        if (text.length < _minLength) {
          return false;
        }

        // try to find that text in our pasta buffer
        var is_copy = _pastas.some(function(pasta) {
          return _smells_like_pasta(text, pasta);
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
