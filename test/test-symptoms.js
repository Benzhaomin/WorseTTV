var main = require("../");

var symptoms = require("../data/symptoms");

exports["test exhibited_by"] = function(assert) {
  
  s = symptoms.MinimumWordCount(2);
  assert.ok(s.exhibited_by("short"), "too few words");
  assert.ok(!s.exhibited_by("two words"), "enough words");
};

require("sdk/test").run(exports);
