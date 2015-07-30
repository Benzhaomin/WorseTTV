
var symptoms = require('./symptoms');

var diagnosis = module.exports = (function () {
  
  // list of the symptoms used for the diagnosis
  var _symptoms = [
    symptoms.MinimumWordCount(2),
    symptoms.MaximumCapsRatio(0.7),
    symptoms.MaximumEmoteCount(1),
    symptoms.MaximumEmoteRatio(0.49),
  ];
  
  // returns a list of cancer symptoms found
  var diagnose = function(text) {
    var found = []
    
    _symptoms.forEach(function(symptom) {
      if (symptom.exhibited_by(text)) {
        found.push(symptom);
      }
    });
    
    return found;
  };
  
  // checks whether a message has cancer
  var is_sane = function(text) {
    return len(self.diagnose(text)) == 0;
  };
  
  // public API
  return {
    is_sane: is_sane,
    diagnose: diagnose,
  };

})();
