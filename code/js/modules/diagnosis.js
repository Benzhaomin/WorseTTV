
var symptoms = require('./symptoms');

module.exports = (function() {

  // list of the symptoms used for the diagnosis
  var _symptoms = [
    symptoms.MinimumWordCount(2),
    symptoms.MaximumCapsRatio(0.5),
    symptoms.MaximumEmoteCount(1),
    symptoms.MaximumEmoteRatio(0.49),
    symptoms.MaximumEchoRatio(0.8),
    symptoms.CopyPasta(),
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

  // checks whether the author is immune to cancer
  var is_immune = function(badge) {
    return badge !== 'pleb'/* && badge !== 'subscriber'*/; // TODO: add options UI
  };

  // diagnose cancer from a Message object
  var has_cancer = function(msg) {
    if (is_immune(msg.badge)) {
      return false;
    }
    return !is_sane(msg.text);
  };

  // public API
  return {
    full: full_diagnosis,
    is_sane: is_sane,
    is_immune: is_immune,
    cancer: has_cancer
  };

})();
