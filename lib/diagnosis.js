
var symptoms = require('./symptoms');

var diagnosis = module.exports = {
  
  _symptoms: [
    symptoms.MinimumWordCount(2),
    symptoms.CapsRatio(0.4),
  ],
  
  // returns a list of cancer symptoms found
  diagnose: function(text) {
    var found = []
    
    this._symptoms.forEach(function(symptom) {
      if (symptom.exhibited_by(text)) {
        found.push(symptom);
      }
    });
    
    return found;
  },
  
  // checks whether a message has cancer
  is_sane: function(text) {
    return len(self.diagnose(text)) == 0;
  }
}
