var main = require("../");

var diagnosis = require("../lib/diagnosis");

exports["test is_sane"] = function(assert) {

  assert.equal(diagnosis.is_sane("short"), false, "1 symptom");
  assert.ok(diagnosis.is_sane("two words"), "0 symptom");
};

exports["test full_diagnosis"] = function(assert) {

  assert.equal(diagnosis.full_diagnosis("short").length, 1, "1 symptom");
  assert.equal(diagnosis.full_diagnosis("two words").length, 0, "0 symptom");
};

require("sdk/test").run(exports);
