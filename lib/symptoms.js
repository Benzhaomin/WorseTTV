
var symptoms = module.exports = {
  
  // message must have a minimum of {count} words
  MinimumWordCount: function(count) {
    return {
      exhibited_by: function(text) {
        return text.split(' ').length < count;
      },
    };
  },
  
  // message must have a maximum of a {ratio} upper to lower characters
  CapsRatio: function(ratio) {
    return {
      exhibited_by: function(text) {
        return text.replace(/[a-z]/g, '').length / text.length > ratio;
      },
    };
  },
  
}
