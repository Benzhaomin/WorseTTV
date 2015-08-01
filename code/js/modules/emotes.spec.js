var assert = require("assert");
var emotes = require("./emotes");

describe('emotes modules', function() {

  // emotes.count()
  describe('count()', function() {

    it('should return 0 when no emote is found in the message', function() {
      assert.equal(0, emotes.count("short"));
    });

    it('should return 0 when no valid emote is found in the message', function() {
      assert.equal(0, emotes.count("Kap"));
    });

    it('should return 1 when one emote is found in the message', function() {
      assert.equal(1, emotes.count("Kappa"));
    });

    it('should return 2 when two emotes are found in the message', function() {
      assert.equal(2, emotes.count("Kappa text Kappa text"));
    });

  });

  // emotes.any_in() (same as count but with early exit and boolean return value)
  describe('any_in()', function() {

    it('should return false when no emote is found in the message', function() {
      assert.equal(false, emotes.any_in("short"));
    });

    it('should return false when no valid emote is found in the message', function() {
      assert.equal(false, emotes.any_in("Kap"));
    });

    it('should return true when one emote is found in the message', function() {
      assert.equal(true, emotes.any_in("Kappa"));
    });

    it('should return true when two emotes are found in the message', function() {
      assert.equal(true, emotes.any_in("Kappa text Kappa text"));
    });

  });

  // emotes.strip()
  describe('strip()', function() {

    it('should return the message itself when no emote are found in a regular message', function() {
      assert.equal("short", emotes.strip("short"));
    });

    it('should return the message itself when no emote are found in an all caps and spaces message', function() {
      assert.equal("A L L C A P S A L L D A Y", emotes.strip("A L L C A P S A L L D A Y"));
    });

    it('should return an empty string when the message is just one emote', function() {
      assert.equal("", emotes.strip("Kappa"));
    });

    it('should return the message with emotes stripped when the message contains a mix of text and emotes', function() {
      assert.equal("text text", emotes.strip("Kappa text Kappa text"));
    });

  });

});
