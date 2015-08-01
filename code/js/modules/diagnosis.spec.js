var assert = require("assert");
var diagnosis = require("./diagnosis");

describe('diagnosis module', function() {

  describe('is_sane()', function() {

    it('should return false when any symptom is exhibited by the message', function () {
      assert.equal(false, diagnosis.is_sane("short"));
    });

    it('should return true when no symptom is exhibited by the message', function () {
      assert.equal(true, diagnosis.is_sane("two words"));
    });

  });

  describe('full_diagnosis()', function() {

    it('should return an array with one element when a single symptom is exhibited by the message', function () {
      assert.equal(1, diagnosis.full_diagnosis("short").length);
    });

    it('should return an array with no element when no symptom is exhibited by the message', function () {
      assert.equal(0, diagnosis.full_diagnosis("two words").length);
    });

  });

});
