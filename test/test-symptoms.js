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

exports["test MaximumEmoteRatio"] = function(assert) {
  
  var maxEmotesRatio = symptoms.MaximumEmoteRatio(0.49);
  assert.ok(maxEmotesRatio.exhibited_by("Kappa //"), "1 emote 1 word");
  assert.ok(!maxEmotesRatio.exhibited_by("Kappa with text"), "two words one emote");
};


require("sdk/test").run(exports);
