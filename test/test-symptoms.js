var main = require("../");

var symptoms = require("../lib/symptoms");

exports["test MinimumWordCount"] = function(assert) {
  
  var minWords = symptoms.MinimumWordCount(2);
  assert.ok(minWords.exhibited_by("short"), "too few words");
  assert.ok(!minWords.exhibited_by("two words"), "enough words");
};

exports["test MaximumCapsRatio"] = function(assert) {
  
  var capsRatio = symptoms.MaximumCapsRatio(0.4);
  assert.ok(capsRatio.exhibited_by("ALL CAPS ALL DAY"), "all caps");
  assert.ok(capsRatio.exhibited_by("A L L C A P S A L L D A Y"), "all caps with spaces");
  assert.ok(capsRatio.exhibited_by("CAPS ResidentSleeper"), "all caps + emote");
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

exports["test MaximumEchoRatio"] = function(assert) {
  
  var maxEchoRatio = symptoms.MaximumEchoRatio(0.8);
  assert.ok(maxEchoRatio.exhibited_by("lol lol"), "2 copies");
  assert.ok(maxEchoRatio.exhibited_by("lol lol lol lol"), "4 copies");
  assert.ok(maxEchoRatio.exhibited_by("foo foo foo foo foo foo foo foo foo foo bar"), "tons of copies + 1 other");
  assert.ok(maxEchoRatio.exhibited_by("foo foo bar bar"), "2*2 copies");
  assert.ok(!maxEchoRatio.exhibited_by("he did he said he do"), "3 copies and some spare against 0.8");
  
  var maxEchoRatio = symptoms.MaximumEchoRatio(0.1);
  assert.ok(maxEchoRatio.exhibited_by("lol lol"), "2 copies");
  assert.ok(maxEchoRatio.exhibited_by("lol lol lol lol"), "4 copies");
  assert.ok(maxEchoRatio.exhibited_by("foo foo foo foo foo foo foo foo foo foo bar"), "tons of copies + 1 other");
  assert.ok(maxEchoRatio.exhibited_by("foo foo bar bar"), "2*2 copies");
  assert.ok(maxEchoRatio.exhibited_by("he did he said he do"), "3 copies and some spare against 0.1");
};

require("sdk/test").run(exports);
