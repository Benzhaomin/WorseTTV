var main = require("../");

var diagnosis = require("../data/diagnosis");

exports["test diagnose"] = function(assert) {
  
  assert.equal(diagnosis.diagnose("short").length, 1, "1 symptom");
  assert.equal(diagnosis.diagnose("two words").length, 0, "0 symptom");
};

require("sdk/test").run(exports);
