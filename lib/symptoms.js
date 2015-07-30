
var symptoms = module.exports = (function (emotes) {
  
  // message must have a minimum of {count} words
  var MinimumWordCount = function(count) {
    return {
      exhibited_by: function(text) {
        return text.split(' ').length < count;
      },
    };
  };
  
  // message must have a maximum of a {ratio} upper to lower characters
  var MaximumCapsRatio = function(ratio) {
    return {
      exhibited_by: function(text) {
        text = emotes.strip(text);
        return text.replace(/[a-z]/g, '').length / text.length > ratio;
      },
    };
  };
  
  // message must have a maximum of {count} emotes
  var MaximumEmoteCount = function(count) {
    return {
      exhibited_by: function(text) {
        return emotes.count(text) > count;
      },
    };
  };
  
  // message must have a maximum of {ratio} emotes to words
  var MaximumEmoteRatio = function(ratio) {
    return {
      exhibited_by: function(text) {
        return emotes.count(text) / text.split(' ').length > ratio;
      },
    };
  };
  
  // public API
  return {
    MinimumWordCount: MinimumWordCount,
    MaximumCapsRatio: MaximumCapsRatio,
    MaximumEmoteCount: MaximumEmoteCount,
    MaximumEmoteRatio: MaximumEmoteRatio,
  };

})(require('./emotes'));

