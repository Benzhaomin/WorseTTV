var main = require("../");

var symptoms = require("../data/symptoms");

exports["test MinimumWordCount"] = function(assert) {
  
  var minWords = symptoms.MinimumWordCount(2);
  assert.ok(minWords.exhibited_by("short"), "too few words");
  assert.ok(!minWords.exhibited_by("two words"), "enough words");
};

require("sdk/test").run(exports);
