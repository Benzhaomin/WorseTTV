var {Cc, Ci} = require("chrome");

var WorseTTV = WorseTTV || {};

WorseTTV.symptoms = {
  
  // message must have a minimum of {count} words
  MinimumWordCount: function(count) {
    return {
      exhibited_by: function(text) {
        return text.split(' ').length < count;
      },
    };
  },
  
}

exports.MinimumWordCount = WorseTTV.symptoms.MinimumWordCount;
