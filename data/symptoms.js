
var symptoms = module.exports = {
  
  // message must have a minimum of {count} words
  MinimumWordCount: function(count) {
    return {
      exhibited_by: function(text) {
        return text.split(' ').length < count;
      },
    };
  },
  
}
