
var symptoms = require('./symptoms');

module.exports = (function() {

  // list of the symptoms used for the diagnosis
  var _symptoms = [
    symptoms.MinimumWordCount(2),
    symptoms.MaximumCapsRatio(0.7),
    symptoms.MaximumEmoteCount(1),
    symptoms.MaximumEmoteRatio(0.49),
    symptoms.MaximumEchoRatio(0.8),
  ];

  // returns a list of cancer symptoms found
  var full_diagnosis = function(text) {
    var found = [];

    _symptoms.forEach(function(symptom) {
      if (symptom.exhibited_by(text)) {
        found.push(symptom);
      }
    });

    return found;
  };

  // checks whether a message has cancer, stop at the very first symptom
  var is_sane = function(text) {
    return !_symptoms.some(function(symptom) {
       return symptom.exhibited_by(text);
    });
  };

  // public API
  return {
    full_diagnosis: full_diagnosis,
    is_sane: is_sane,
  };

})();
