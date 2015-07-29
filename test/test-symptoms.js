var main = require("../");

var symptoms = require("../lib/symptoms");

exports["test MinimumWordCount"] = function(assert) {
  
  var minWords = symptoms.MinimumWordCount(2);
  assert.ok(minWords.exhibited_by("short"), "too few words");
  assert.ok(!minWords.exhibited_by("two words"), "enough words");
};

exports["test CapsRatio"] = function(assert) {
  
  var capsRatio = symptoms.CapsRatio(0.4);
  assert.ok(capsRatio.exhibited_by("ALL CAPS ALL DAY"), "all caps");
  assert.ok(!capsRatio.exhibited_by("Proper casing"), "proper casing");
};

exports["test MaximumEmoteCount"] = function(assert) {
  
  var maxEmotes = symptoms.MaximumEmoteCount(1);
  assert.ok(maxEmotes.exhibited_by("Kappa Kappa"), "zwei kappa");
  assert.ok(!maxEmotes.exhibited_by("Kappa"), "eins kappa");
};

require("sdk/test").run(exports);